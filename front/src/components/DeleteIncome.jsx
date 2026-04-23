import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function DeleteIncome({ userId, incomeId, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
   

    setLoading(true);
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/user/${userId}/income/delete/${incomeId}`,
        { withCredentials: true }
      );
      setShowConfirm(false);
      onDelete?.(res.data);
      toast.success("Income deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      toast.error("Failed to delete income.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <button
      onClick={() => setShowConfirm(true)}
      disabled={loading}
      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded transition-all text-xs font-bold mx-1 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>

    {showConfirm && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
        <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg max-w-sm w-full text-center">
          <p className="mb-6 text-lg font-medium">
            Are you sure you want to delete this income?
          </p>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Yes
            </button>

            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              No
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}

export default DeleteIncome;
