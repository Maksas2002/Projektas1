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
        <input type="text" className="border" {...register("amount", {required: true,})}/>
      </form>
    </>
  );
}

export default AddIncomeForm;