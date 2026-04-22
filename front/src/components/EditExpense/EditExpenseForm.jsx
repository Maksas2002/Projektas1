import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../utlis/UserContext";
import errorHandler from "../../utils/errorHandler";

function EditExpenseForm({ expenseId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);

  const user = useContext(UserContext);

  const getId = () => {
    return user?.user?.id || user?.user?.data?.id || null;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getId();
        if (!userId) {
          setServerError("User ID not found. Please log in again.");
          return;
        }
        const catRes = await axios.get("http://localhost:3000/api/v1/categories", {
          withCredentials: true,
        });
        const expenseCats = catRes.data.filter((cat) => cat.type === "expense");
        setCategories(expenseCats);
        const expenseRes = await axios.get(
          `http://localhost:3000/api/v1/user/${userId}/expense/${expenseId}`,
          { withCredentials: true }
        );

        const exp = expenseRes.data.data;

        reset({
          amount: exp.amount,
          description: exp.description,
          date: exp.date?.slice(0, 10),
          category_id: exp.category_id,
        });

      } catch (err) {
        setServerError(errorHandler(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [expenseId, reset]);

  const onSubmit = async (data) => {
    const userId = getId();
    if (!userId) {
      setServerError("User ID not found. Please log in again.");
      return;
    }

    try {
      setServerError(null);
      setSuccess(null);

      await axios.patch(
        `http://localhost:3000/api/v1/user/${userId}/expenses/edit/${expenseId}`,
        data,
        { withCredentials: true }
      );

      setSuccess("Expense updated successfully!");

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);

    } catch (err) {
      setServerError(errorHandler(err));
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white py-6 animate-pulse">
        Loading expense data...
      </div>
    );
  }

  return (
    <form
      className="flex flex-col pt-5 gap-3 animate-fadeIn"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label className="text-white text-sm pl-1">Amount (EUR)</label>
        <input
          type="number"
          step="any"
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-yellow-500"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0.01, message: "Number must be positive" },
          })}
        />
        {errors.amount && (
          <p className="text-xs text-red-500 pl-1">{errors.amount.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm pl-1">Description</label>
        <input
          type="text"
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-yellow-500"
          {...register("description", { maxLength: 255 })}
        />
        {errors.description && (
          <p className="text-xs text-red-500 pl-1">Too long (max 255 chars)</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm pl-1">Date</label>
        <input
          type="date"
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-yellow-500"
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && (
          <p className="text-xs text-red-500 pl-1">{errors.date.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm pl-1">Category</label>
        <select
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-yellow-500"
          {...register("category_id", { required: "Select a category" })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-xs text-red-500 pl-1">{errors.category_id.message}</p>
        )}
      </div>

      <input
        type="submit"
        value="Save Changes"
        className="block border border-yellow-600 hover:bg-yellow-700 cursor-pointer rounded-md bg-yellow-600 text-white mt-4 py-2 font-bold transition-all shadow-md"
      />

      {serverError && (
        <p className="text-center text-red-600 mt-2 bg-red-100 rounded py-1">
          {serverError}
        </p>
      )}

      {success && (
        <p className="text-center text-green-500 mt-2 bg-green-100 rounded py-1">
          {success}
        </p>
      )}
    </form>
  );
}

export default EditExpenseForm;
