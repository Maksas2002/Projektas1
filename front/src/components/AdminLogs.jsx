import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem('user');
      const token = savedUser ? JSON.parse(savedUser)?.token : null;

      try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/logs', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            user: search || undefined,
            action: actionFilter !== 'All' ? actionFilter.toLowerCase() : undefined
          }
        });
        // Patikriname ar data.data yra masyvas
        setLogs(response.data.data || response.data || []);
      } catch (err) {
        console.error(err);
        setError('Nepavyko užkrauti logų');
      } finally {
        setLoading(false);
      }
    };

    // Debounce paieškai (nebūtina, bet sveika)
    const timeoutId = setTimeout(() => {
      fetchLogs();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, actionFilter]);

  return (
    <div className="bg-[#1e293b] rounded-xl border border-slate-700/50 overflow-hidden shadow-xl mt-6">
      <div className="p-6 border-b border-slate-700/50 bg-slate-800/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-white">Activity Log</h2>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <input 
            type="text"
            placeholder="Search user..."
            className="bg-[#0f172a] border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2 outline-none focus:border-blue-500 flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select 
            className="bg-[#0f172a] border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="All">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="login">Login</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase font-bold tracking-wider border-b border-slate-700/50">
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {loading ? (
              <tr><td colSpan="4" className="text-center py-10 text-slate-500">Loading logs...</td></tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-all">
                  <td className="px-6 py-4">
                    <span className="text-blue-400 font-medium capitalize">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">
                    {log.user_display_name || log.username || 'System'}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm italic">
                    {log.details}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {log.created_at ? new Date(log.created_at).toLocaleString('lt-LT') : '---'}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center py-10 text-slate-500">No activity found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLogs;