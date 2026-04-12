import { useState } from "react";
import axios from "axios";

const EditCategoriesAdmin = ({ category, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: category.name,
    type: category.type
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `http://localhost:3000/api/v1/admin/categories/${category.id}`,
        formData,
        { withCredentials: true }
      );

      alert("Category updated successfully!");
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update category");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-6 rounded-xl w-96 border border-slate-700"
      >
        <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          Edit Category
        </h2>

        <div className="my-5">
          <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">
            Category Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white transition-all"
            required
          />
        </div>

        <div className="my-5">
          <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white cursor-pointer"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-7">
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-2 rounded-lg text-sm font-bold shadow-lg transition-all active:scale-95"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg text-sm font-bold shadow-lg transition-all active:scale-95"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoriesAdmin;
