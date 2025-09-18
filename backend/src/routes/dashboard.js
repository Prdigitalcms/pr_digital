const express = require("express");
const { authenticateToken } = require("../middleware/auth");

// Correct relative paths to model files (folder is "model" in your project)
const Release        = require("../model/release.model");
const User           = require("../model/user.model");
const Artist         = require("../model/artist.model");
const Label          = require("../model/label.model");
const FormSubmission = require("../model/upload.model"); // upload.model.js => FormSubmission

const router = express.Router();

// 📌 Get dashboard statistics
router.get("/stats", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let stats = {};

    if (userRole === "admin" || userRole === "manager") {
      // Admin/Manager dashboard stats
      const releases = await Release.find({});
      const releaseStats = (releases || []).reduce((acc, release) => {
        acc[release.status] = (acc[release.status] || 0) + 1;
        return acc;
      }, {});

      const totalUsers = await User.countDocuments();
      const totalArtists = await Artist.countDocuments();
      const totalLabels = await Label.countDocuments();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Verify the timestamp field in your upload model: createdAt or created_at
      const recentSubmissions = await FormSubmission.countDocuments({
        createdAt: { $gte: sevenDaysAgo },
      });

      const pendingApprovals = await Release.countDocuments({ status: "pending" });

      stats = {
        totalReleases: releases.length,
        releasesByStatus: releaseStats,
        totalUsers,
        totalArtists,
        totalLabels,
        recentSubmissions,
        pendingApprovals,
      };
    } else {
      // Artist/User dashboard stats
      const userReleases = await Release.find({ created_by: userId });
      const userReleaseStats = (userReleases || []).reduce((acc, release) => {
        acc[release.status] = (acc[release.status] || 0) + 1;
        return acc;
      }, {});

      const totalSubmissions = await FormSubmission.countDocuments({ uploaded_by: userId });
      const pendingReleases = await Release.countDocuments({ created_by: userId, status: "pending" });
      const approvedReleases = await Release.countDocuments({ created_by: userId, status: "approved" });

      stats = {
        totalReleases: userReleases.length,
        releasesByStatus: userReleaseStats,
        totalSubmissions,
        pendingReleases,
        approvedReleases,
      };
    }

    res.json({ stats });
  } catch (err) {
    console.error("Dashboard stats error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📌 Get recent activity
router.get("/activity", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const limit = parseInt(req.query.limit, 10) || 10;

    let activities;

    if (userRole === "admin" || userRole === "manager") {
      activities = await FormSubmission.find({})
        .populate("uploaded_by", "username email role")
        .populate("release_id", "title status")
        .sort({ createdAt: -1 })
        .limit(limit);
    } else {
      activities = await FormSubmission.find({ uploaded_by: userId })
        .populate("release_id", "title status")
        .sort({ createdAt: -1 })
        .limit(limit);
    }

    res.json({ activities });
  } catch (err) {
    console.error("Dashboard activity error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📌 Get recent releases
router.get("/recent-releases", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const limit = parseInt(req.query.limit, 10) || 5;

    let query = Release.find({})
      .populate("artist_id", "name")
      .populate("label_id", "name")
      .populate("created_by", "username email role")
      .sort({ createdAt: -1 })
      .limit(limit);

    if (userRole !== "admin" && userRole !== "manager") {
      query = Release.find({ created_by: userId })
        .populate("artist_id", "name")
        .populate("label_id", "name")
        .populate("created_by", "username email role")
        .sort({ createdAt: -1 })
        .limit(limit);
    }

    const releases = await query;
    res.json({ releases });
  } catch (err) {
    console.error("Recent releases error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
