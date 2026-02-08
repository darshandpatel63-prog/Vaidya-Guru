import React from 'react';
import { User } from '../types';

export const AdminPanel: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold serif-font text-stone-800 mb-8">Admin Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 bg-blue-50 rounded-[2rem] border text-center">
          <p className="text-[10px] font-black uppercase mb-1">Total Users</p>
          <p className="text-3xl font-black text-blue-900">1,248</p>
        </div>
        <div className="p-6 bg-green-50 rounded-[2rem] border text-center">
          <p className="text-[10px] font-black uppercase mb-1">Active Today</p>
          <p className="text-3xl font-black text-green-900">456</p>
        </div>
        <div className="p-6 bg-amber-50 rounded-[2rem] border text-center">
          <p className="text-[10px] font-black uppercase mb-1">Exams Taken</p>
          <p className="text-3xl font-black text-amber-900">89</p>
        </div>
        <div className="p-6 bg-purple-50 rounded-[2rem] border text-center">
          <p className="text-[10px] font-black uppercase mb-1">AI Consults</p>
          <p className="text-3xl font-black text-purple-900">3,412</p>
        </div>
      </div>
    </div>
  );
};
