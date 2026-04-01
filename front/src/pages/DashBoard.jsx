import DashHeader from "../components/Header/DashHeader/DashHeader"
import AddIncome from "../components/AddIncome/AddIncome";

function DashBoard(){
return(
    <>
    <main>
        <DashHeader/>

        <div className="flex justify-center">
        <AddIncome/>
        </div>
    </main>
    </>
);
}

export default DashBoard;