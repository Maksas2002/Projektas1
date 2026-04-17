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
      className="bg-red-600 text-white px-3 py-1 rounded-md"
    >
      Delete
    </button>
  );
}

export default DeleteExpense;