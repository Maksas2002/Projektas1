import { useState } from "react";
import axios from 'axios';

const AddCategoriesAdmin = ({ onCategoryCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "income",
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const savedUser = localStorage.getItem('user');
        let token = null;
        
        try {
        const userObj = JSON.parse(savedUser);
        token = userObj?.token || userObj?.accessToken;
        } catch (err) {
        token = savedUser;
        }


        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/admin/categories",
                formData,
                { withCredentials: true }
            );

            if(response.status === 200 || response.status === 201){
                setFormData({ name: "", type: "expense" });
                if (onCategoryCreated) onCategoryCreated();
                alert("Category created successfully!");
            }
        } catch (error) {
            console.error("Category creation error:", error.response);

            if (err.response?.status === 409) {
                setError("Category name already exists.");
            } else {
                setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Server error. Please try again."
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    }


    return(
    <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl border border-slate-700/50">
        <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            Create New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-4 items-end bg-[#1e293b] p-4 rounded-xl border border-slate-700/50">
            <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">
                Name Category
                </label>
                <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white transition-all placeholder:text-slate-600"
                required
                />
            </div>

            <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">
                Type
                </label>
                <select
                value={formData.type}
                onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                }
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white cursor-pointer appearance-none shadow-inner"
                >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Creating..." : "Create Category"}
            </button>
            </div>

            {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg animate-shake">
                <p className="text-red-400 text-xs text-center font-medium flex items-center justify-center gap-2">
                <span className="text-base font-bold">!</span> {error}
                </p>
            </div>
            )}
        </form>
    </div>
    );
}

export default AddCategoriesAdmin