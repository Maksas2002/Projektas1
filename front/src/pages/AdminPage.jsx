import { useEffect, useState, useCallback } from 'react';
import AdminUserCreate from '../components/AdminUserCreate';
import AdminUserEdit from '../components/AdminUserEdit';
import AdminLogs from '../components/AdminLogs';
import AddCategoriesAdmin from '../components/Categories/AddCategoriesAdmin';
import ListCategoriesAdmin from '../components/Categories/ListCategoriesAdmin';
import { toast } from "react-toastify";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [refreshLogsKey, setRefreshLogsKey] = useState(0);
  const [refreshCategoriesKey, setRefreshCategoriesKey] = useState(0);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const getToken = () => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;
    try {
      const parsed = JSON.parse(savedUser);
      return parsed.token || parsed.accessToken;
    } catch {
      return savedUser;
    }
  };

  const fetchUsers = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setError("Jūs nesate prisijungęs");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/v1/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (res.ok) {
        // Pritaikyta tavo duomenų struktūrai
        const usersList = data.data || data.users || (Array.isArray(data) ? data : []);
        setUsers(usersList);
        setError(null);
      } else {
        if (res.status === 401) {
          setError("Sesija pasibaigė. Prašome prisijungti iš naujo.");
          localStorage.removeItem('user');
        } else {
          setError(data.message || "Nepavyko užkrauti vartotojų");
        }
      }
    } catch (err) {
      setError("Serverio ryšio klaida");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDataChange = () => {
    fetchUsers();
    setRefreshCategoriesKey(prev => prev + 1);
    setRefreshLogsKey(prev => prev + 1);
  };

  const handleDeleteUser = async (id) => {
    const token = getToken();

try {
  const res = await fetch(`http://localhost:3000/api/v1/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    setDeletingUserId(null);
    toast.success("User deleted successfully!");
    handleDataChange();
  } else {
    const errorData = await res.json();
    toast.error(errorData.message || "Failed to delete user.");
  }
} catch (err) {
  toast.error("Server connection error.");
}
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white italic">
      Kraunama valdymo panelė...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 bg-[#1e293b] p-5 rounded-xl shadow-2xl border border-slate-700/50">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Management System</p>
        </div>
        <button
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 px-5 py-2 rounded-lg transition-all font-bold text-sm"
        >
          Log Out
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Vartotojo kūrimas */}
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl border border-slate-700/50">
          <AdminUserCreate onUserCreated={handleDataChange} />
        </div>

        {/* Vartotojų lentelė - ATKURTA PAGAL TAVO DIZAINĄ */}
        <div className="bg-[#1e293b] rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/30">
            <h2 className="text-lg font-semibold text-white">User Management</h2>
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-600/30">
              {users.length} Active Accounts
            </span>
          </div>

          {error && (
            <div className="m-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#334155]/20 text-slate-400 text-[11px] uppercase tracking-[0.2em] font-bold">
                  <th className="px-6 py-5">User</th>
                  <th className="px-6 py-5">Email Address</th>
                  <th className="px-6 py-5">Status / Role</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {users.map((user) => (
                  <tr key={user.id || user._id} className="hover:bg-slate-800/40 transition-all group">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-bold text-white uppercase shadow-lg">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <span className="font-semibold text-white">{user.name}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setEditingUser(user)} className="bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white px-3 py-1 rounded transition-all text-xs font-bold mx-1">Edit</button>
                      <button onClick={() => setDeletingUserId(user.id || user._id)} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded transition-all text-xs font-bold mx-1">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Redagavimo modalas */}
       {editingUser && (
  <AdminUserEdit 
    user={editingUser} 
    onClose={() => setEditingUser(null)} 
    onUpdated={handleDataChange} 
  />
)}

{deletingUserId && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-white">
    <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg max-w-sm w-full text-center">
      <p className="mb-6 text-lg font-medium">
        Are you sure you want to delete this user?
      </p>

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => handleDeleteUser(deletingUserId)}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Yes
        </button>

        <button
          type="button"
          onClick={() => setDeletingUserId(null)}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}


        {/* Kategorijų valdymas - SU APSAUGA NUO LOOP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl border border-slate-700/50">
             <AddCategoriesAdmin onCategoryCreated={handleDataChange} />
          </div>
          <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl border border-slate-700/50">
             <ListCategoriesAdmin key={refreshCategoriesKey} />
          </div>
        </div>

        {/* Veiklos logai */}
        <div className="mt-8">
           <AdminLogs key={refreshLogsKey} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;