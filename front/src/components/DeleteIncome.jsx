import axios from "axios";
import { useState } from "react";

function DeleteIncome({ userId, incomeId, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this income?")) return;

    setLoading(true);
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/user/${userId}/income/delete/${incomeId}`,
        { withCredentials: true }
      );

      onDelete?.(res.data);
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded transition-all text-xs font-bold mx-1 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}

export default DeleteIncome;
