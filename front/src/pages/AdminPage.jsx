import React, { useEffect, useState, useCallback } from 'react';
import AdminUserCreate from '../components/AdminUserCreate';
import AdminUserEdit from '../components/AdminUserEdit';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

 const fetchUsers = useCallback(async () => {
  const savedUser = localStorage.getItem('user');
  
  if (!savedUser) {
    setError("Jūs nesate prisijungęs (Nerastas 'user' objektas)");
    setLoading(false);
    return;
  }

  let token = null;
  try {
    const fullResponse = JSON.parse(savedUser);
    

    token = fullResponse.token;



  } catch (e) {
    token = savedUser;
  }

  if (!token) {
    setError("Jūs nesate prisijungęs (Token laukas tuščias)");
    setLoading(false);
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/v1/admin/users', {
      method: 'GET', // Pridedam metodą aiškumui
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await res.json();
    
    if (res.ok) {
      const usersList = data.data || data.users || (Array.isArray(data) ? data : []);
      setUsers(usersList);
      setError(null);
    } else {
      if (res.status === 401) {
        setError("Sesija pasibaigė. Prašome prisijungti iš naujo.");
        localStorage.removeItem('user');
      } else {
       setError(data.message || data.error || "Nepavyko užkrauti vartotojų");
      }
    }
  } catch (err) {
    setError("Serverio ryšio klaida (Patikrinkite ar veikia Backend)");
  } finally {
    setLoading(false);
  }
}, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Ar tikrai norite ištrinti vartotoją?")) return;
    
    const savedUser = localStorage.getItem('user');
    let token = null;
    try {
      const parsed = JSON.parse(savedUser);
      token = parsed.token;
    } catch {
      token = savedUser;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/v1/admin/users/${id}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

      if (res.ok) {
        setUsers(prev => prev.filter(user => (user.id || user._id || user.uuid) !== id));
      } else {
        const errorData = await res.json();
       alert(`Ištrinti nepavyko: ${errorData.message || errorData.error || 'Serverio klaida'}`);
      }
    } catch (err) {
      alert("Klaida susisiekiant su serveriu");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white font-sans">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-slate-400 animate-pulse">Kraunama duomenų bazė...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans">
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

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl border border-slate-700/50">
          <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            Create New User
          </h2>
          <AdminUserCreate onUserCreated={fetchUsers} />
        </div>

        <div className="bg-[#1e293b] rounded-xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/30">
            <h2 className="text-lg font-semibold text-white">User Management</h2>
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-600/30">
                {users.length} Active Accounts
            </span>
          </div>

          {error && (
            <div className="m-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
              <span className="font-bold mr-2">⚠️ Klaida:</span> {error}
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
                {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id || user._id || Math.random()} className="hover:bg-slate-800/40 transition-all group">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-bold text-white uppercase shadow-lg">
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
                          <button onClick={() => setEditingUser(user)} className="bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white px-3 py-1 rounded transition-all text-xs font-bold mx-2">Edit</button>
                          <button 
                            onClick={() => handleDelete(user.id || user._id)} 
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded transition-all text-xs font-bold mx-2"
                          >
                            Delete
                          </button>
                        </td>
                        
                      </tr>
                    ))
                ) : (
                    !loading && !error && (
                        <tr>
                            <td colSpan="4" className="px-6 py-10 text-center text-slate-500 italic">Vartotojų nerasta.</td>
                        </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
          {editingUser && <AdminUserEdit user={editingUser} onClose={() => setEditingUser(null) } onUpdated={fetchUsers}/>}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;