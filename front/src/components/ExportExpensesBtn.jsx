import axios from "axios";
import { saveAs } from "file-saver"
import errorHandler from "../utils/errorHandler";

const ExportExpensesBtn = () => {

    const handleExport = async () =>{
        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/expenses/export", {
                withCredentials: true, 
                responseType: "blob"
            });
            
            saveAs(response.data, "expenses.csv");
        } catch (error) {
            console.error("CSV download failed:", errorHandler(error));
        }
    }

    return(
        <button className="bg-[#1f2747] text-white p-2 ml-2 rounded" onClick={handleExport}>
            Export expenses
        </button>
    );
}

export default ExportExpensesBtn;