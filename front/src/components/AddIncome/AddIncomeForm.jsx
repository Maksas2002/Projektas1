import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../utlis/UserContext";
import errorHandler from "../../utils/errorHandler";

function AddIncomeForm() {
  const [error, setError] = useState(null);
  const user = useContext(UserContext);

  const userId = user.user.id;
  // console.log(user.user.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/user/${userId}/income/add`,
        data,
        {
          withCredentials: true,
        },
      );

      reset();
    } catch (error) {
      // console.log(response.data);
      setError(errorHandler(error));
    }
  };

  return (
    <>
      <form className="flex flex-col pt-5" onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-white">Amount (EUR)</label>

        <input
          type="number"
          className="border bg-[#4e5263b2] border-blue-900 rounded-[6px] text-white pl-2"
          placeholder="0.00"
          {...register("amount", {
            required: true,
            min: { value: 1, message: "Number cannot be negative" },
          })}
        />
        {errors.amount && (
          <p className="text-center  text-red-600">
            Must be a non negative number and cannot post letters
          </p>
        )}

        <label className="block text-white">Description</label>
        <input
          type="text"
          className="border bg-[#4e5263b2] border-blue-900 rounded-[6px] text-white pl-2"
          {...register("description", { maxLength: 255 })}
        />
        {errors.description && (
          <p className="text-center t text-red-600">Cannot be longer than 255 characters</p>
        )}

        <label className="block text-white">Date</label>
        <input
          type="date"
          className="border bg-[#4e5263b2] border-blue-900 rounded-[6px] text-white pl-2"
          {...register("date", { required: true })}
        />
        {errors.date && <p className="text-center text-red-600">Must write a date</p>}

        <input type="submit" className="block border border-green-600 hover:bg-green-500 cursor-pointer rounded-[6px] bg-green-400 text-white mt-3" value="Add Income" />

        <p className="text-center text-red-600">{error}</p>
      </form>
    </>
  );
}

export default AddIncomeForm;
