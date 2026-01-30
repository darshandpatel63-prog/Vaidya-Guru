import React, { useState, useEffect } from 'react';
import { Notice, User } from '../types';

const STORAGE_KEY = 'vaidyaguru_notices';
const COLORS = ['#fff9c4', '#ffecb3', '#e1f5fe', '#f3e5f5', '#e8f5e9'];

export const BulletinBoard: React.FC<{ user: User }> = ({ user }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setNotices(JSON.parse(saved));
  }, []);

  const addNotice = () => {
    if (!newTitle || !newContent) return;
    const notice: Notice = {
      id: 'n_' + Date.now(), title: newTitle, content: newContent, author: user.name, timestamp: Date.now(), type: 'public', pinnedPosition: { x: 0, y: 0 }
    };
    const next = [notice, ...notices];
    setNotices(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setShowAdd(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="min-h-full p-8 bg-[#8d6e63] rounded-[3rem] shadow-inner border-[12px] border-amber-900/20 relative overflow-hidden">
      {/* Wood texture simulation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
      
      <div className="flex justify-between items-center mb-10 relative z-10">
        <h2 className="text-3xl font-bold serif-font text-white drop-shadow-md">Notice Board</h2>
        <button onClick={() => setShowAdd(true)} className="px-6 py-3 bg-amber-900 text-white rounded-full font-bold shadow-xl border-2 border-amber-800">+ Add Note</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {notices.map((n, idx) => (
          <div key={n.id} className="p-8 shadow-2xl relative transition-transform hover:scale-105 hover:z-20 cursor-default group" style={{ backgroundColor: COLORS[idx % COLORS.length], transform: `rotate(${Math.sin(idx)*3}deg)` }}>
            {/* Push-pin */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full shadow-lg border-b-4 border-red-800">
                <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full"></div>
            </div>
            <h4 className="font-bold text-stone-800 mb-2 border-b border-stone-800/10 pb-2">{n.title}</h4>
            <p className="text-sm text-stone-600 leading-relaxed font-medium">{n.content}</p>
            <div className="mt-6 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-stone-400">
               <span>By {n.author}</span>
               <span>{new Date(n.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-2xl font-bold serif-font text-amber-900 mb-6">Create Sticky Note</h3>
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Subject" className="w-full p-4 mb-4 border-2 rounded-2xl focus:border-amber-900 outline-none" />
            <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="What's the update?" rows={4} className="w-full p-4 mb-6 border-2 rounded-2xl focus:border-amber-900 outline-none" />
            <div className="flex gap-4">
               <button onClick={() => setShowAdd(false)} className="flex-1 py-4 font-bold text-stone-400">Cancel</button>
               <button onClick={addNotice} className="flex-1 py-4 bg-amber-900 text-white rounded-2xl font-bold shadow-lg">Pin to Board</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
