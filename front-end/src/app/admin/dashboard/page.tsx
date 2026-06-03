import React from 'react';
import { Users, Server, Shield, Activity, RefreshCw, Cpu } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  // Mock statistical data for Admin
  const stats = [
    { name: 'Total Users', value: '1,248', icon: Users, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
    { name: 'System Status', value: 'Healthy', icon: Server, color: 'text-green-500 bg-green-500/10 border-green-500/20' },
    { name: 'Active Sessions', value: '42', icon: Activity, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
    { name: 'Security Audits', value: 'Passed', icon: Shield, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
  ];

  const recentUsers = [
    { name: 'Ahmad Khan', email: 'ahmad@panaversity.org', role: 'Student', status: 'Verified' },
    { name: 'Dr. Sarah Ali', email: 'sarah@panaversity.org', role: 'Teacher', status: 'Verified' },
    { name: 'Hamza Naseem', email: 'hamza@panaversity.org', role: 'Admin', status: 'Verified' },
    { name: 'John Doe', email: 'john@gmail.com', role: 'Visitor', status: 'Unverified' },
  ];

  return (
    <div className="space-y-8 text-gray-100 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Cpu className="text-blue-500 w-8 h-8" />
            Panaversity Control Center
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage users, check system health, and audit access credentials.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 text-sm font-medium rounded-xl transition-all"
          >
            User View
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            Refresh Systems
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.name}</span>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>
              <div className={`p-3 rounded-xl border ${item.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* User Management & Security Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Table Card */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-4">
          <h2 className="text-lg font-bold text-white">Recent Registrations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 font-medium">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-850">
                {recentUsers.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-850/30">
                    <td className="py-3.5 font-semibold text-white">{user.name}</td>
                    <td className="py-3.5 text-gray-400">{user.email}</td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        user.role === 'Teacher' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        user.role === 'Student' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                        user.status === 'Verified' ? 'text-green-400' : 'text-yellow-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Verified' ? 'bg-green-400' : 'bg-yellow-500'}`} />
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security / System Logs */}
        <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-4">
          <h2 className="text-lg font-bold text-white">System Events</h2>
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-400 uppercase">Auth Service</span>
                <span className="text-gray-500">1 min ago</span>
              </div>
              <p className="text-gray-300">Successfully generated verification magic link for user student@panaversity.org</p>
            </div>

            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-blue-400 uppercase">Database</span>
                <span className="text-gray-500">4 mins ago</span>
              </div>
              <p className="text-gray-300">SQLite engine connection established successfully (check_same_thread=False)</p>
            </div>

            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-purple-400 uppercase">Token Store</span>
                <span className="text-gray-500">10 mins ago</span>
              </div>
              <p className="text-gray-300">Active session token added to AuthToken database for admin@panaversity.org</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
