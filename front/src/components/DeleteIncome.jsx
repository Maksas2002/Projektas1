import axios from "axios";

function DeleteIncome({ userId, incomeId, onDelete}) {

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/user/${userId}/income/delete/${incomeId}`,
        {
            withCredentials: true,
        }
      );

      onDelete?.();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded transition-all text-xs font-bold mx-1"
    >
      Delete
    </button>
  );
}

export default DeleteIncome;
