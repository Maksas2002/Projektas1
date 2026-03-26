import UserLogout from "./UserLogout";
import { useState } from "react";

function DashHeader() {
    const [show, setShow] = useState(false);

    const toShow = () => {
        setShow(() => true);
    }

    const notToShow = () => {
        setShow(() => false);
    }

    return (
        <>
            <header className="flex justify-around pt-5 border-b border-white/10">
                <div>
                    <h2>My Dashboard</h2>
                    <p>Personal Finance Overview</p>
                </div>
                <div><button onClick={() => toShow()} type="button">Exit</button></div>
                {show ? <UserLogout notToShow={() => notToShow}/> : null}
            </header>
        </>
    );
}

export default DashHeader;