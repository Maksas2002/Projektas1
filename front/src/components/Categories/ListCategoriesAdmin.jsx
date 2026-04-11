import React, { useEffect, useState } from "react";
import axios from "axios";

const ListCategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/categories",
        { withCredentials: true }
      );
      setCategories(response.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/30">
            <h2 className="text-lg font-semibold text-white">Category list</h2>
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-600/30">
              {categories.length} Categories
            </span>
          </div>
        <div className="overflow-x-auto mt-6">
            <table className="w-full text-left">
                <thead>
                <tr className="bg-[#334155]/20 text-slate-400 text-[11px] uppercase tracking-[0.2em] font-bold">
                    <th className="px-6 py-5">Category</th>
                    <th className="px-6 py-5">Type</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-slate-700/50">
                {loading && (
                    <tr>
                    <td colSpan="2" className="px-6 py-10 text-center text-slate-500 italic">
                        Loading categories...
                    </td>
                    </tr>
                )}

                {!loading && categories.length === 0 && (
                    <tr>
                    <td colSpan="2" className="px-6 py-10 text-center text-slate-500 italic">
                        No categories found.
                    </td>
                    </tr>
                )}

                {categories.map((cat) => (
                    <tr
                    key={cat.id}
                    className="hover:bg-slate-800/40 transition-all group"
                    >
                    <td className="px-6 py-4 flex items-center gap-3">
                        <span className="font-semibold text-2xl text-slate-300">{cat.name}</span>
                    </td>

                    <td className="px-6 py-4">
                        <span
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            cat.type === "income"
                            ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                        >
                        {cat.type}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ListCategoriesAdmin;
