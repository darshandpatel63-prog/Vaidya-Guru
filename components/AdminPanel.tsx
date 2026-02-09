import React from 'react';
import { User } from '../types';

export const AdminPanel: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold serif-font text-stone-800 mb-8">Admin Dashboard</h2>
      
      <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-stone-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
         <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-4xl shadow-inner animate-pulse">
            ⏳
         </div>
         <h3 className="text-2xl font-bold text-stone-800 mb-3 serif-font">Analytics Coming Soon...</h3>
         <p className="text-stone-500 max-w-sm mx-auto leading-relaxed">
           Real-time user tracking and global statistics are currently under development. This feature will be enabled once the central database is connected.
         </p>
         <div className="mt-8 px-6 py-2 bg-stone-100 rounded-full text-xs font-bold text-stone-400 uppercase tracking-widest">
            Feature Locked
         </div>
      </div>
    </div>
  );
};
