const express = require("express");
const Release = require("../models/release");
const { authenticateToken, requireRole } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// ---------------- GET all releases ----------------
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, artist_id, label_id, search } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (artist_id) filters.artist_id = artist_id;
    if (label_id) filters.label_id = label_id;
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { upc: { $regex: search, $options: "i" } }
      ];
    }

    const releases = await Release.find(filters)
      .populate("artist_id", "name bio")
      .populate("label_id", "name description")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Release.countDocuments(filters);

    res.json({
      releases,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Get releases error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- GET single release ----------------
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const release = await Release.findById(req.params.id)
      .populate("artist_id", "name bio")
      .populate("label_id", "name description");

    if (!release) return res.status(404).json({ error: "Release not found" });

    res.json({ release });
  } catch (error) {
    console.error("Get release error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- CREATE release ----------------
router.post(
  "/",
  authenticateToken,
  requireRole(["admin", "manager"]),
  upload.fields([
    { name: "coverArt", maxCount: 1 },
    { name: "audioFile", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { title, artist_id, label_id, upc, genre, release_date, description } = req.body;

      if (!title || !artist_id || !upc) {
        return res.status(400).json({ error: "Title, artist_id, and UPC are required" });
      }

      const existingRelease = await Release.findOne({ upc });
      if (existingRelease) {
        return res.status(400).json({ error: "UPC already exists" });
      }

      let coverArtUrl = null;
      let audioFileUrl = null;

      if (req.files?.coverArt?.[0]) {
        coverArtUrl = `/uploads/covers/${req.files.coverArt[0].filename}`;
      }

      if (req.files?.audioFile?.[0]) {
        audioFileUrl = `/uploads/audio/${req.files.audioFile[0].filename}`;
      }

      const release = new Release({
        title,
        artist_id,
        label_id,
        upc,
        genre,
        release_date,
        description,
        cover_art_url: coverArtUrl,
        audio_file_url: audioFileUrl,
        status: "pending",
        created_by: req.user.id
      });

      await release.save();

      res.status(201).json({
        message: "Release created successfully",
        release
      });
    } catch (error) {
      console.error("Create release error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ---------------- UPDATE release ----------------
router.put(
  "/:id",
  authenticateToken,
  requireRole(["admin", "manager"]),
  upload.fields([
    { name: "coverArt", maxCount: 1 },
    { name: "audioFile", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = { ...req.body, updatedAt: new Date() };

      if (req.files?.coverArt?.[0]) {
        updates.cover_art_url = `/uploads/covers/${req.files.coverArt[0].filename}`;
      }

      if (req.files?.audioFile?.[0]) {
        updates.audio_file_url = `/uploads/audio/${req.files.audioFile[0].filename}`;
      }

      const release = await Release.findByIdAndUpdate(id, updates, { new: true })
        .populate("artist_id", "name bio")
        .populate("label_id", "name description");

      if (!release) return res.status(404).json({ error: "Release not found" });

      res.json({ message: "Release updated successfully", release });
    } catch (error) {
      console.error("Update release error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// ---------------- DELETE release ----------------
router.delete("/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
  try {
    const release = await Release.findByIdAndDelete(req.params.id);
    if (!release) return res.status(404).json({ error: "Release not found" });

    res.json({ message: "Release deleted successfully" });
  } catch (error) {
    console.error("Delete release error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- UPDATE release status ----------------
router.patch("/:id/status", authenticateToken, requireRole(["admin", "manager"]), async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "approved", "delivered", "takedown", "rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be one of: " + validStatuses.join(", ") });
    }

    const updates = { status, updatedAt: new Date() };

    if (status === "approved") {
      updates.approved_at = new Date();
      updates.approved_by = req.user.id;
    }

    const release = await Release.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!release) return res.status(404).json({ error: "Release not found" });

    res.json({ message: "Release status updated successfully", release });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
