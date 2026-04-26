import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

const AdminUserEdit = ({ user, onClose, onUpdated }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        role: user.role
    });

    //Funkcija kuri išsiunčia PATCH užklausa
    const handleSubmit = async (e) => {
        e.preventDefault();

        const savedUser = localStorage.getItem("user");
        const token = JSON.parse(savedUser)?.token;

        try {
            //Siunčiame PATCH užklausą į serverį
            await axios.patch(
                `http://localhost:3000/api/v1/admin/users/${user.id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            //atnaujina ir uždaro
            toast.success("User updated successfully!");
            onUpdated();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to update user.");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-[#1e293b] p-6 rounded-xl w-96 border border-slate-700"
            >
                <div>
                    <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                        Edit User
                    </h2>

                </div>


                <div className="my-5">
                    <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">Full Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white transition-all placeholder:text-slate-600"
                    />
                </div>

                <div className="my-5">
                    <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">Email Address</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white transition-all placeholder:text-slate-600"
                    />
                </div>

                <div className="my-5">
                    <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">Role</label>
                    <select
                        value={formData.role}
                        onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                        }
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white cursor-pointer appearance-none shadow-inner"
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
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
    )
}

export default AdminUserEdit;