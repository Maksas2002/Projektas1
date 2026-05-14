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
    <div className="bg-[#1b2448] rounded-lg border border-[#1b346c] overflow-hidden mt-4">
      <div className="p-4 border-b border-[#283046] flex flex-col md:flex-row justify-between items-center gap-3">
        <h2 className="text-base font-semibold text-white">Activity Log</h2>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <input 
            type="text"
            placeholder="Search admin or user..."
            className="bg-[#303a59] border border-[#3b4667] text-slate-300 text-sm rounded-md px-4 py-2 outline-none focus:border-sky-400 flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select 
            className="bg-[#303a59] border border-[#3b4667] text-slate-300 text-sm rounded-md px-4 py-2 outline-none focus:border-sky-400 cursor-pointer"
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

      <div className="overflow-hidden">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-[#283046]">
              <th className="w-24 px-2 md:px-3 py-3 break-words">Action</th>
              <th className="w-32 px-2 md:px-3 py-3 break-words">User / Admin</th>
              <th className="px-2 md:px-3 py-3 break-words">Target (Subject)</th>
              <th className="px-2 md:px-3 py-3 break-words">Details</th>
              <th className="w-32 px-2 md:px-3 py-3 break-words">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#283046]">
            {loading ? (
              <tr><td colSpan="5" className="text-center py-10 text-slate-500 italic font-light tracking-widest">Loading records...</td></tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#111b3c] transition-all">
                  <td className="px-2 md:px-3 py-3 break-words">
                    <span className={getActionBadge(log.action)}>
                      {log.action.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-2 md:px-3 py-3 break-words">
                    <div className="flex flex-col">
                      <span className="text-slate-200 text-sm font-medium">{log.user_display_name || 'System'}</span>
                      <span className="text-slate-500 text-[10px]">{log.username || 'admin'}</span>
                    </div>
                  </td>
                  <td className="px-2 md:px-3 py-3 break-words">
                    <span className="text-blue-300/80 text-sm font-semibold">
                      {log.target_name || '---'}
                    </span>
                  </td>
                  <td className="px-2 md:px-3 py-3 text-slate-400 text-sm break-words">
                    {log.details}
                  </td>
                  <td className="px-2 md:px-3 py-3 text-slate-400 text-xs tabular-nums break-words">
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
