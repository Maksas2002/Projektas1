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
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="block">Amount (EUR)</label>

        <input
          type="number"
          className="border"
          placeholder="0.00"
          {...register("amount", {
            required: true,
            min: { value: 0, message: "Number cannot be negative" },
          })}
        />
        {errors.amount && (
          <p className="text-center">
            Must be a non negative number and cannot post letters
          </p>
        )}

        <label className="block">Description</label>
        <input
          type="text"
          className="border"
          {...register("description", { maxLength: 255 })}
        />
        {errors.description && (
          <p className="text-center">Cannot be longer than 255 characters</p>
        )}

        <label className="block">Date</label>
        <input
          type="date"
          className="border"
          {...register("date", { required: true })}
        />
        {errors.date && <p className="text-center">Must write a date</p>}

        <input type="submit" className="block border mt-3" value="Add Income" />

        <p>{error}</p>
      </form>
    </>
  );
}

export default AddIncomeForm;
