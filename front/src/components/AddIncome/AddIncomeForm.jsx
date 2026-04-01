import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../utlis/UserContext";
import errorHandler from "../../utils/errorHandler";

function AddIncomeForm() {
  const [error, setError] = useState(null);
  const user  = useContext(UserContext);


const userId = user.user.id;
 

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
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <label className="block">Description</label>
        <input
          type="text"
          className="border"
          {...register("description", { maxLength: 255 })}
        />

        <label className="block">Date</label>
        <input
          type="date"
          className="border"
          {...register("date", { required: true })}
        />

        <input type="submit" className="block border" value="Add Income" />

        <p>{error}</p>
      </form>
    </>
  );
}

export default AddIncomeForm;
