import { useState, useEffect } from "react";
import axios from "axios";

const BudgetSection = ({ selectedDate }) => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      // Jei selectedDate nėra (kaip image_02dcda.png atveju), naudojame šiandienos datą
      const dateToUse = selectedDate || `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
      
      const [year, month] = dateToUse.split("-");
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/user/my-budgets?year=${year}&month=${parseInt(month)}`,
          { withCredentials: true }
        );
        
        if (res.data.status === "success") {
          setBudgets(res.data.data);
        }
      } catch (err) {
        console.error("Klaida siunčiant užklausą:", err);
        setBudgets([]); // Klaidos atveju išvalome, kad nelūžtų .map()
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [selectedDate]);

  // Nebegrąžiname null, kad vartotojas matytų sekciją net jei data kraunasi
  if (loading && budgets.length === 0) return <div className="text-white p-8">Kraunami limitai...</div>;

  return (
    <div className="bg-[#161b33] p-8 rounded-2xl border border-gray-800 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Biudžeto limitai</h2>
        <p className="text-gray-400 text-sm">Apžvalga pagal pasirinktą laikotarpį</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {budgets.length > 0 ? (
          budgets.map((budget) => {
            // SVARBU: Naudojame pavadinimus, kuriuos siunčia Backendas
            const used = Number(budget.spent_amount) || 0; 
            const limit = Number(budget.limit_amount) || 1; 
            const percent = Math.min((used / limit) * 100, 100);
            const isOver = used > limit;

            return (
              <div key={budget.id || budget.category_id} className="bg-[#0f1429] p-6 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-medium">{budget.category_name}</span>
                  <span className={isOver ? "text-red-500 font-bold" : "text-blue-400 font-bold"}>
                    €{used.toFixed(2)} / €{limit.toFixed(0)}
                  </span>
                </div>

                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${isOver ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <p className="text-[10px] mt-2 text-gray-500 uppercase font-bold text-left">
                  {isOver ? "Viršytas limitas!" : `${percent.toFixed(0)}% Panaudota`}
                </p>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-10 text-center text-gray-500">
             Nėra biudžeto limitų šiam mėnesiui.
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetSection;