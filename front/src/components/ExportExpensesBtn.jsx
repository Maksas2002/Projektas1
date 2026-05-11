import axios from "axios";
import { saveAs } from "file-saver";
import errorHandler from "../utils/errorHandler";

const ExportExpensesBtn = ({ startDate, endDate }) => {
  const handleExport = async () => {
    try {
      const params = {};

      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get(
        "http://localhost:3000/api/v1/user/expenses/export",
        {
          params,
          responseType: "blob",
          withCredentials: true,
        }
      );

      saveAs(response.data, "expenses.csv");
    } catch (error) {
      console.error("CSV download failed:", errorHandler(error));
    }
  };

  return (
    <button
      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 h-9 rounded-md text-xs"
      onClick={handleExport}
    >
      Export CSV
    </button>
  );
};

export default ExportExpensesBtn;
