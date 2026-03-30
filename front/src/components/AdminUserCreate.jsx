import React, { useState } from 'react';
import axios from 'axios';

const AdminUserCreate = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'User' 
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // 1. GAUNAME TOKENĄ SAUGIAI
    const savedUser = localStorage.getItem('user');
    let token = null;
    
    try {
      const userObj = JSON.parse(savedUser);
      token = userObj?.token || userObj?.accessToken;
    } catch (err) {
      token = savedUser;
    }

    try {
      // 2. SIUNČIAME UŽKLAUSĄ
      const response = await axios.post('http://localhost:3000/api/v1/admin/users', formData,  {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 201 || response.status === 200) {
        // Išvalome formą
        setFormData({ name: '', email: '', password: '', role: 'User' });
        if (onUserCreated) onUserCreated(); 
        alert("Vartotojas sėkmingai sukurtas!");
      }
      
    } catch (err) {
      // 3. DETALUS KLAIDŲ APDOROJIMAS
      console.error("Registracijos klaida:", err.response);
      
      if (err.response?.status === 409) {
        setError("Šis el. pašto adresas jau užimtas.");
      } else {
        setError(err.response?.data?.message || err.response?.data?.error || "Serverio klaida. Patikrinkite ryšį.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end bg-[#1e293b] p-4 rounded-xl border border-slate-700/50">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            placeholder="Jonas Jonaitis"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white transition-all placeholder:text-slate-600"
            required
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            placeholder="jonas@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white transition-all placeholder:text-slate-600"
            required
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white transition-all placeholder:text-slate-600"
            required
          />
        </div>

        <div className="w-[130px]">
          <label className="block text-xs text-slate-400 mb-1.5 ml-1 font-semibold uppercase tracking-wider">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-white cursor-pointer appearance-none shadow-inner"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? "Creating..." : "Create User"}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg animate-shake">
          <p className="text-red-400 text-xs text-center font-medium flex items-center justify-center gap-2">
            <span className="text-base font-bold">!</span> {error}
          </p>
        </div>
      )}
    </form>
  );
};

export default AdminUserCreate;