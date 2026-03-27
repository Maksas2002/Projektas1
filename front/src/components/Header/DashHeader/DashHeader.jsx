import UserLogout from "./UserLogout";
import { useState } from "react";
import exit from "../../../assets/box-arrow-right.svg";

function DashHeader() {
  const [show, setShow] = useState(false);

  const toShow = () => {
    setShow(() => true);
  };

  const notToShow = () => {
    setShow(() => false);
  };

  return (
    <>
      <header className="bg-[#020b33] pb-2 pt-2 text-white flex justify-around items-center border-b-white/10">
        <div>
          <h2 className="text-2xl font-semibold text-blue-400 ">
            My Dashboard
          </h2>
          <p className="text-[1.2rem]">Personal Finance Overview</p>
        </div>
        <div>
          <button
            className="text-sm font-medium cursor-pointer bg-blue-500 hover:bg-blue-400 px-5 py-2 rounded-[10px]"
            onClick={() => toShow()}
            type="button"
          >
            <div className="flex items-center gap-2">
                <div className="mt-1">
              <img src={exit} className="w-5 h-4" />
              </div>
              <span className="block">Exit</span>
            </div>
          </button>
        </div>
        {show ? <UserLogout notToShow={() => notToShow} /> : null}
      </header>
    </>
  );
}

export default DashHeader;
