const AdminUserEdit = ({ setShowEdit }) => {
    return(
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
            <div className="p-6 border rounded-lg shadow-lg max-w-sm w-full text-center">
                <p>A page</p>

                <button
                onClick={() => setShowEdit(false)}
                className="bg-blue-400 px-4 py-2 rounded hover:bg-blue-500"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default AdminUserEdit;