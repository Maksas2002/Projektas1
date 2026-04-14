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

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/admin/categories",
                formData,
                { withCredentials: true }
            );

            if (response.status === 200 || response.status === 201) {
                setFormData({ name: "", type: "income" });
                alert("Category created successfully!");
                if (onCategoryCreated) onCategoryCreated(); // Informuojame tėvą
            }
        } catch (err) {
            console.error("Category creation error:", err);
            setError(err.response?.data?.message || "Server error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                Create New Category
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap gap-4 items-end bg-[#0f172a] p-4 rounded-xl border border-slate-700/50">
                    <div className="flex-1">
                        <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-white"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-white"
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
                    >
                        {isSubmitting ? "..." : "Create"}
                    </button>
                </div>
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default AddCategoriesAdmin;