import { useEffect, useState, useCallback } from 'react';
import AdminUserCreate from '../components/AdminUserCreate';
import AdminUserEdit from '../components/AdminUserEdit';
import AdminLogs from '../components/AdminLogs';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [refreshLogsKey, setRefreshLogsKey] = useState(0);

  const getToken = () => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;
    try {
      const parsed = JSON.parse(savedUser);
      return parsed.token;
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
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (res.ok) {
        setUsers(data.data || data.users || (Array.isArray(data) ? data : []));
        setError(null);
      } else {
        setError(data.message || "Nepavyko užkrauti vartotojų");
      }
    } catch (err) {
      setError("Ryšio klaida");
    } finally {
      setLoading(false);
    }
  }, []);

  // Funkcija, kviečiama po sėkmingo veiksmo
  const handleDataChange = () => {
    fetchUsers();
    setRefreshLogsKey(prev => prev + 1); // Atnaujiname logus
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ar tikrai norite ištrinti vartotoją?")) return;
    const token = getToken();

    try {
      const res = await fetch(`http://localhost:3000/api/v1/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        handleDataChange(); // Atnaujinam ir sąrašą, ir logus
      } else {
        const errorData = await res.json();
        alert(`Klaida: ${errorData.message}`);
      }
    } catch (err) {
      alert("Klaida susisiekiant su serveriu");
    }
  };

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  if (loading) return <div className="text-white text-center mt-20">Kraunama...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 bg-[#1e293b] p-5 rounded-xl border border-slate-700/50">
        <div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Admin Panel</h1>
          <p className="text-xs text-slate-400">MANAGEMENT SYSTEM</p>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2 rounded-lg transition-all text-sm font-bold">Log Out</button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Vartotojo kūrimas */}
        <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700/50">
          <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span> Create New User
          </h2>
          <AdminUserCreate onUserCreated={handleDataChange} />
        </div>

        {/* Vartotojų lentelė */}
        <div className="bg-[#1e293b] rounded-xl border border-slate-700/50 overflow-hidden shadow-xl">
           {/* ... (lentelės HTML lieka toks pat kaip tavo) ... */}
           <div className="overflow-x-auto">
             <table className="w-full text-left">
                {/* ... table headers ... */}
                <tbody className="divide-y divide-slate-700/50">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-slate-800/40 transition-all">
                      <td className="px-6 py-4 font-semibold text-white">{user.name}</td>
                      <td className="px-6 py-4 text-slate-300">{user.email}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold ${user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                           {user.role}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setEditingUser(user)} className="text-blue-500 mr-4">Edit</button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>

        {editingUser && <AdminUserEdit user={editingUser} onClose={() => setEditingUser(null)} onUpdated={handleDataChange} />}

        {/* LOGAI: key atributas privers komponentą persikrauti kaskart kai pasikeis refreshLogsKey */}
        <AdminLogs key={refreshLogsKey} />
      </div>
    </div>
  );
};

export default AdminPage;