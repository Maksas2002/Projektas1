import axios from "axios";
import { useEffect } from "react";

function MonthlyIncome() {

    const getIncome = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/user/2026-04-01/totalIncome`,
                {
                    withCredentials: true,
                }
            )
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getIncome();
    }, []);


    return (
        <>
            <section className="border border-green-500 bg-linear-to-br from-[#020b33] to-[#14215a] rounded-[20px] p-8 mt-5 w-45">
                <p>Income</p>
                <p>Money</p>
                <p>This month</p>
            </section>
        </>
    );
}

export default MonthlyIncome;