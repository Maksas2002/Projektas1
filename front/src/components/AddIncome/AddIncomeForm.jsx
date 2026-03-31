import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { UserContext } from "../../utlis/UserContext";

function AddIncomeForm() {
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
      </form>
    </>
  );
}

export default AddIncomeForm;
