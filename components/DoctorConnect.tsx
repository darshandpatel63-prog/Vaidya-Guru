// અહીં આપણે Role.DOCTOR કાઢીને Role.STUDENT (જે હવે આયુર્વેદ અધ્યેતા છે) સેટ કર્યું છે.

import React from 'react';
import { User, Role } from '../types';

export const DoctorConnect: React.FC<{ user: User }> = ({ user }) => {
  // હવે આપણી પાસે માત્ર 'STUDENT' અને 'NORMAL' રોલ જ છે
  const isDoc = user.role === Role.STUDENT; 

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold serif-font text-stone-800 mb-8">Medical Connect</h2>
      <div className="bg-white p-10 rounded-[3rem] border-2 border-stone-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">👨‍⚕️</div>
        <h3 className="text-xl font-bold text-stone-800 mb-2">
          {isDoc ? 'Incoming Patient Requests' : 'Request Consultation'}
        </h3>
        <p className="text-stone-400 text-sm mb-8">
          {isDoc ? 'No active requests nearby.' : 'Connect with a VaidyaGuru expert doctor.'}
        </p>
        <button className="px-10 py-4 bg-green-900 text-white rounded-full font-bold shadow-lg">
          {isDoc ? 'Refresh' : 'Send Request'}
        </button>
      </div>
    </div>
  );
};
