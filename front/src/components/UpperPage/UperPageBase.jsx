import { useContext } from "react";
import { UserContext } from "../../utlis/UserContext";

function UpperPageBase() {
  const user = useContext(UserContext);

  // get name from context

  const getUserName = () => {
    return user?.user?.name || user?.user?.data?.name || null;
  };

  return (
    <>
      <section className="flex justify-around">
        <div>
          <h1 className="text-white text-[1.5rem]">
            Welckome back, {getUserName()}
          </h1>
          <p className="text-sky-400">
            Here's your financial overview for month
          </p>
        </div>
      </section>
    </>
  );
}

export default UpperPageBase;
