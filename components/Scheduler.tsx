import React from 'react';
import { User } from '../types';

export const Scheduler: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold serif-font text-stone-800 mb-8">Academic Schedule</h2>
      <div className="space-y-4">
        {[
          { time: '09:00 AM', title: 'Charaka Samhita Lecture', color: 'bg-blue-50 text-blue-900' },
          { time: '11:30 AM', title: 'Ward Rounds', color: 'bg-amber-50 text-amber-900' },
          { time: '04:00 PM', title: 'Self Study - Dravyaguna', color: 'bg-green-50 text-green-900' }
        ].map((s, i) => (
          <div key={i} className="flex gap-6 items-center">
            <span className="text-xs font-black text-stone-300 w-20">{s.time}</span>
            <div className={`flex-1 p-6 rounded-[2rem] border ${s.color}`}>
               <h4 className="font-bold">{s.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
