import React, { useEffect, useState } from "react";
import axios from "axios";
import EditCategoriesAdmin from "./EditCategoriesAdmin";

const ListCategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/categories",
        { withCredentials: true }
      );
      setCategories(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  // Vykdoma tik vieną kartą "gimstant" komponentui
  useEffect(() => {
    fetchCategories();
  }, []); 

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/admin/categories/${id}`, { withCredentials: true });
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
        <h2 className="text-white font-semibold italic">Category List</h2>
        <span className="text-blue-400 text-xs font-bold">{categories.length} Total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[10px] uppercase font-bold border-b border-slate-700/50">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {loading ? (
              <tr><td colSpan="3" className="text-center py-10 text-slate-500">Loading...</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-800/40 transition-all">
                  <td className="px-6 py-4 text-slate-200 font-medium">{cat.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cat.type === 'income' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                      {cat.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setEditingCategory(cat)} className="text-blue-500 mr-3 text-xs font-bold">Edit</button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-500 text-xs font-bold">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingCategory && (
        <EditCategoriesAdmin 
          category={editingCategory} 
          onClose={() => setEditingCategory(null)} 
          onUpdated={fetchCategories} 
        />
      )}
    </div>
  );
};

export default ListCategoriesAdmin;