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
            action: actionFilter !== 'All' ? actionFilter : undefined
          }
        });
        setLogs(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError('Nepavyko užkrauti logų');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchLogs();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, actionFilter]);

  const getActionBadge = (action) => {
    const base = "px-2 py-1 rounded-md text-[10px] font-bold uppercase ";
    
    // Nauja spalva prisijungimui (Violetinė/Indigo)
    if (action.includes('LOGIN')) return base + "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30";
    
    if (action.includes('CREATE')) return base + "bg-green-500/20 text-green-400 border border-green-500/30";
    if (action.includes('UPDATE')) return base + "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    if (action.includes('DELETE')) return base + "bg-red-500/20 text-red-400 border border-red-500/30";
    return base + "bg-slate-500/20 text-slate-400 border border-slate-500/30";
  };

  return (
    <div className="bg-[#1e293b] rounded-xl border border-slate-700/50 overflow-hidden shadow-xl mt-6">
      <div className="p-6 border-b border-slate-700/50 bg-slate-800/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-white">Activity Log</h2>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <input 
            type="text"
            placeholder="Search admin or user..."
            className="bg-[#0f172a] border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2 outline-none focus:border-blue-500 flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select 
            className="bg-[#0f172a] border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2 outline-none focus:border-blue-500 cursor-pointer"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="All">All Actions</option>
            <option value="LOGIN">User Logins</option>
            <option value="LOGOUT">User Logouts</option>
            <option value="CREATE_CATEGORY">Create Category</option>
            <option value="UPDATE_CATEGORY">Update Category</option>
            <option value="DELETE_CATEGORY">Delete Category</option>
            <option value="CREATE_USER">Create User</option>
            <option value="UPDATE_USER">Update User</option>
            <option value="DELETE_USER">Delete User</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase font-bold tracking-wider border-b border-slate-700/50">
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">User / Admin</th>
              <th className="px-6 py-4">Target (Subject)</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {loading ? (
              <tr><td colSpan="5" className="text-center py-10 text-slate-500 italic font-light tracking-widest">Loading records...</td></tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-all">
                  <td className="px-6 py-4">
                    <span className={getActionBadge(log.action)}>
                      {log.action.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-200 text-sm font-medium">{log.user_display_name || 'System'}</span>
                      <span className="text-slate-500 text-[10px]">{log.username || 'admin'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-blue-300/80 text-sm font-semibold">
                      {log.target_name || '---'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {log.details}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs tabular-nums">
                    {log.created_at ? new Date(log.created_at).toLocaleString('lt-LT') : '---'}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center py-10 text-slate-500">No activity found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {error && <div className="p-4 bg-red-500/10 text-red-400 text-center text-sm border-t border-red-500/20">{error}</div>}
    </div>
  );
};

export default AdminLogs;