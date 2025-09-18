import { useState } from "react";

interface ReleaseFormProps {
  onClose: () => void;
}

function ReleaseForm({ onClose }: ReleaseFormProps) {
  const [title, setTitle] = useState("");
  const [upc, setUpc] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRelease = {
      title,
      upc,
      artist_id: "66e4e8d2a1b123...", // backend se actual artist ID lena hoga
      created_by: "66e4f0d7a1c456...", // login user ID yahan dalna hoga
    };

    try {
      const res = await fetch("http://localhost:5000/api/releases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRelease),
      });

      if (!res.ok) throw new Error("Failed to add release");

      const data = await res.json();
      console.log("✅ Release added:", data);
      onClose(); // form close karo
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Release Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="UPC"
        value={upc}
        onChange={(e) => setUpc(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReleaseForm;
