const AdminUserEdit = ({user, onClose, onUpdated}) => {

    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
            <form
            onSubmit={handleSubmit}
            className="bg-[#1e293b] p-6 rounded-xl w-96 border border-slate-700"
            >
                <h2 className="text-lg font-bold text-white mb-4">Edit User</h2>

                <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mb-3 p-2 rounded bg-slate-800 text-white"
                />

                <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mb-3 p-2 rounded bg-slate-800 text-white"
                />

                <select
                value={formData.role}
                onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                }
                className="w-full mb-3 p-2 rounded bg-slate-800 text-white"
                >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-600 rounded text-white"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 rounded text-white"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminUserEdit;