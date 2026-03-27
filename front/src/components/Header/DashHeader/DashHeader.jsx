import DeleteAccount from "./DeleteAccount";
import UserLogout from "./UserLogout";
import { useState } from "react";
import exit from "../../../assets/box-arrow-right.svg";

function DashHeader() {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const toShow = () => {
        setShow(() => true);
    }

    const notToShow = () => {
        setShow(() => false);
    }

    return (
        <>
            <header className="bg-[#020b33] pb-2 pt-2 text-white flex justify-around items-center border-b-white/10">
                <div>
                    <h2 className="text-2xl font-semibold text-blue-400 ">My Dashboard</h2>
                    <p className="text-[1.2rem]">Personal Finance Overview</p>
                </div>
                <div className="flex">

                    <button onClick={() => toShow()} className="flex flex-row-reverse items-center gap-2 text-sm font-medium cursor-pointer bg-blue-500 hover:bg-blue-400 px-5 py-2 rounded-[10px]" type="button"><span className="text-[1rem] font-medium">Exit</span>
                        <img src={exit} alt="exit" className="w-4 h-4 " />
                    </button>

                    <button onClick={() => setShowDelete(true)} className="bg-red-400 text-white hover:bg-red-500 mx-3 py-3 px-5 text-sm rounded-xl font-bold">Delete your Account</button>
                </div>
                {show ? <UserLogout notToShow={() => notToShow} /> : null}
                {showDelete && (<DeleteAccount setShowDelete={setShowDelete} />)}
            </header>
        </>
    );
}

export default DashHeader;