import { useContext } from "react";
import { UserContext } from "../../utlis/UserContext";


function UpperPageBase() {
    const user = useContext(UserContext);

    return (
        <>
            <section className="flex justify-around">
                <div>
                    <h1 className="text-white text-[1.5rem]">Welckome back, {user.user.data.name}</h1>
                    <p className="text-sky-400">Here's your financial overview for month</p>
                </div>

                
            </section>
        </>
    );
}

export default UpperPageBase;