import DeleteAccount from "./DeleteAccount";
import UserLogout from "./UserLogout";
import { useState } from "react";

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
            <header className="flex justify-around pt-5">
                <div>
                    <h2>My Dashboard</h2>
                    <p>Personal Finance Overview</p>
                </div>
                <div>
                    <button onClick={() => toShow()} type="button">Exit</button>
                    <button onClick={() => setShowDelete(true)} className="bg-red-400 text-white hover:bg-red-500 mx-3 py-3 px-5 text-sm rounded-xl font-bold">Delete your Account</button>
                </div>
                {show ? <UserLogout notToShow={() => notToShow}/> : null}
                {showDelete && (<DeleteAccount setShowDelete={setShowDelete}/>)}
            </header>

            

            
        </>
    );
}

export default DashHeader;