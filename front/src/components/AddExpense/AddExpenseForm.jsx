import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../utlis/UserContext"; // Patikrink, ar tavo aplankalas vadinasi 'utlis' ar 'utils'
import errorHandler from "../../utils/errorHandler";

function AddExpenseForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const user = useContext(UserContext);

  // Saugus ID gavimas
  const userId = user?.user?.id || user?.user?.data?.id || JSON.parse(localStorage.getItem("user"))?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Kategorijų užkrovimas (su 401 klaidos prevencija)
  useEffect(() => {
    if (userId) {
      const fetchCategories = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/v1/categories", { 
            withCredentials: true 
          });
          setCategories(res.data.filter(cat => cat.type === 'expense'));
        } catch (err) {
          console.error("Nepavyko užkrauti kategorijų", err);
        }
      };
      fetchCategories();
    }
  }, [userId]);

  const onSubmit = async (data) => {
    if (!userId) {
      setError("User not found. Please log in again.");
      return;
    }

    try {
      setError(null);
      // Naudojame tavo maršrutą /user/ (be s)
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/${userId}/expenses/add`,
        data,
        { withCredentials: true }
      );

      if (res.data.status === "success" || res.status === 200) {
      
        setSuccess("Expense added successfully!");
        reset();
       
      }
    } catch (error) {
      setError(errorHandler(error));
    }
  };

  return (
    <form className="flex flex-col pt-5 gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Amount laukas */}
      <div className="flex flex-col gap-1">
        <label className="block text-white text-sm pl-1">Amount (EUR)</label>
        <input
          type="number"
          step="any"
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-red-500"
          placeholder="0.00"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0.01, message: "Must be a positive number" },
          })}
        />
        {errors.amount && <p className="text-xs text-red-500 pl-1">{errors.amount.message}</p>}
      </div>

      {/* Description laukas */}
      <div className="flex flex-col gap-1">
        <label className="block text-white text-sm pl-1">Description</label>
        <input
          type="text"
          placeholder="E.g. Groceries"
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-red-500"
          {...register("description", { maxLength: 255 })}
        />
        {errors.description && <p className="text-xs text-red-500 pl-1">Max 255 characters</p>}
      </div>

      {/* Date laukas */}
      <div className="flex flex-col gap-1">
        <label className="block text-white text-sm pl-1">Date</label>
        <input
          type="date"
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-red-500"
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && <p className="text-xs text-red-500 pl-1">{errors.date.message}</p>}
      </div>

      {/* Category laukas */}
      <div className="flex flex-col gap-1">
        <label className="block text-white text-sm pl-1">Category</label>
        <select
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-red-500 appearance-none"
          {...register("category_id", { required: "Select a category" })}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.category_id && <p className="text-xs text-red-500 pl-1">{errors.category_id.message}</p>}
      </div>

      <input 
        type="submit" 
        className="block border border-red-600 hover:bg-red-700 cursor-pointer rounded-md bg-red-600 text-white mt-4 py-2 font-bold transition-all" 
        value="Save Transaction" 
      />

      {error && <p className="text-center text-red-500 mt-2 text-sm">{error}</p>}
      
      {success && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
    <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg max-w-sm w-full text-center">
      <p className="mb-6 text-lg font-medium">{success}</p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        OK
      </button>
    </div>
  </div>
)}
    </form>
  );
}

export default AddExpenseForm;