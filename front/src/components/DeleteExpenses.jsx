import axios from "axios";

function DeleteExpense({ userId, expenseId, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Ar tikrai nori ištrinti šią išlaidą?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/user/${userId}/expenses/delete/${expenseId}`,
        {
          withCredentials: true,
        }
      );

      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      // className="bg-red-600 text-white px-3 py-1 rounded-md"
       className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded transition-all text-xs font-bold mx-1 disabled:opacity-50"
    >
      Delete
    </button>
  );
}

export default DeleteExpense;