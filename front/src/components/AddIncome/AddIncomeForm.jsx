import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../utlis/UserContext"; // Atkreipk dėmesį, ar nėra rašybos klaidos 'utlis' vs 'utils'
import errorHandler from "../../utils/errorHandler";

function AddIncomeForm() {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); // Būsena kategorijoms
  const user = useContext(UserContext);

  // ID gavimas iš context
  const getId = () => {
    return user?.user?.id || user?.user?.data?.id || null;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Kategorijų užkrovimas
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/categories", { 
          withCredentials: true 
        });
        // Atrenkame tik pajamas
        const incomeCats = res.data.filter(cat => cat.type === 'income');
        setCategories(incomeCats);
      } catch (err) {
        console.error("Kategorijų užkrauti nepavyko");
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    const userId = getId();
    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    try {
      setError(null);
      await axios.post(
        `http://localhost:3000/api/v1/user/${userId}/income/add`,
        data,
        { withCredentials: true }
      );

      alert("Income added successfully!");
      reset();
      window.location.reload(); // Atnaujiname puslapį duomenų sinchronizacijai
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
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-green-500"
          placeholder="0.00"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0.01, message: "Number must be positive" },
          })}
        />
        {errors.amount && <p className="text-xs text-red-500 pl-1">{errors.amount.message}</p>}
      </div>

      {/* Description laukas */}
      <div className="flex flex-col gap-1">
        <label className="block text-white text-sm pl-1">Description</label>
        <input
          type="text"
          placeholder="Source of income"
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-green-500"
          {...register("description", { maxLength: 255 })}
        />
        {errors.description && <p className="text-xs text-red-500 pl-1">Too long (max 255 chars)</p>}
      </div>

      {/* Date laukas */}
      <div className="flex flex-col gap-1">
        <label className="block text-white text-sm pl-1">Date</label>
        <input
          type="date"
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-green-500"
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && <p className="text-xs text-red-500 pl-1">{errors.date.message}</p>}
      </div>

      {/* Category laukas (NAUJAS) */}
      <div className="flex flex-col gap-1">
        <label className="block text-white text-sm pl-1">Category</label>
        <select
          className="p-2 border bg-[#4e5263b2] border-blue-900 rounded-md text-white outline-none focus:border-green-500 appearance-none"
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
        className="block border border-green-600 hover:bg-green-700 cursor-pointer rounded-md bg-green-600 text-white mt-4 py-2 font-bold transition-all shadow-md" 
        value="Save Transaction" 
      />

      {error && <p className="text-center text-red-600 mt-2 bg-red-100 rounded py-1">{error}</p>}
    </form>
  );
}

export default AddIncomeForm;