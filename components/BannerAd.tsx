import React, { useState, useEffect } from 'react';

export const BannerAdSize = {
  ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
  BOX: 'BOX',
  HALF_SCREEN: 'HALF_SCREEN',
};

// Test IDs provided by Google AdMob for testing
export const TestIds = {
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917'
};

interface BannerAdProps {
  unitId: string;
  size: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({ unitId, size }) => {
  const isBox = size === BannerAdSize.BOX;
  const isHalf = size === BannerAdSize.HALF_SCREEN;

  return (
    <div className={`w-full bg-stone-100 border-stone-200 flex flex-col items-center justify-center p-4 select-none ${isHalf ? 'min-h-[300px] border-y my-8' : isBox ? 'aspect-[3/4] rounded-[2rem] border' : 'border-t'}`}>
      <div className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">Sponsored Advertisement</div>
      <div className={`bg-stone-200 rounded-2xl border border-dashed border-stone-300 flex items-center justify-center overflow-hidden ${isBox ? 'w-full h-full' : isHalf ? 'w-full h-[250px]' : 'w-full h-[50px]'}`}>
        <div className="flex flex-col items-center gap-1">
          <div className="px-2 py-0.5 bg-green-900 rounded text-white text-[10px] font-bold">Ad</div>
          <span className="text-[10px] font-medium text-stone-500">Ad Placeholder</span>
        </div>
      </div>
    </div>
  );
};

export const InterstitialAd = {
  show: (onClose: () => void) => {
    const existing = document.getElementById('interstitial-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'interstitial-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:black;z-index:200000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;';

    overlay.innerHTML = `
      <div style="color:white;font-family:serif;font-size:24px;margin-bottom:20px;">VaidyaGuru - Ad</div>
      <div style="width:100%;max-width:400px;background:#1a1a1a;border-radius:24px;padding:40px;text-align:center;">
        <div style="display:inline-block;padding:4px 8px;background:#ef4444;color:white;font-size:10px;font-weight:bold;border-radius:4px;margin-bottom:16px;">INTERSTITIAL AD</div>
        <p style="color:#fff;font-size:18px;margin-bottom:10px;font-weight:bold;">Deepen Your Knowledge</p>
        <p style="color:#888;font-size:14px;margin-bottom:20px;">Upgrade to Pro for an ad-free experience and exclusive BAMS content.</p>
        <div style="color:white;font-size:12px;">Closing in <span id="ad-timer">3</span>s...</div>
      </div>
      <button id="close-ad" style="margin-top:20px;padding:12px 24px;background:white;color:black;border-radius:99px;font-weight:bold;opacity:0.3;pointer-events:none;">Skip Ad</button>
    `;
    
    document.body.appendChild(overlay);

    let count = 3;
    const timer = setInterval(() => {
      count--;
      const timerEl = document.getElementById('ad-timer');
      if (timerEl) timerEl.innerText = count.toString();
      if (count <= 0) {
        clearInterval(timer);
        const btn = document.getElementById('close-ad');
        if (btn) {
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
        }
      }
    }, 1000);

    overlay.querySelector('#close-ad')?.addEventListener('click', () => {
      overlay.remove();
      onClose();
    });
  }
};

export const RewardedAd = {
  show: (onComplete: () => void) => {
    const existing = document.getElementById('rewarded-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'rewarded-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:#064e3b;z-index:200000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;';

    overlay.innerHTML = `
      <div style="color:white;font-family:serif;font-size:24px;margin-bottom:20px;">Rewarded Video Ad</div>
      <div style="width:100%;max-width:400px;background:white;border-radius:32px;padding:40px;text-align:center;box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
        <div style="display:inline-block;padding:4px 8px;background:#fbbf24;color:black;font-size:10px;font-weight:bold;border-radius:4px;margin-bottom:16px;">REWARDED</div>
        <p style="color:#064e3b;font-size:20px;margin-bottom:10px;font-weight:bold;">Unlock Premium Feature</p>
        <p style="color:#374151;font-size:14px;margin-bottom:30px;">Watch this short video to gain access to edit your profile or change settings.</p>
        <div style="width:100%;height:8px;background:#f3f4f6;border-radius:4px;overflow:hidden;margin-bottom:10px;">
          <div id="reward-progress" style="width:0%;height:100%;background:#064e3b;transition:width 1s linear;"></div>
        </div>
        <div style="color:#064e3b;font-size:12px;font-weight:bold;">Video ends in <span id="reward-timer">5</span>s</div>
      </div>
      <div id="reward-status" style="margin-top:20px;color:white;font-size:12px;opacity:0.6;">You must watch until the end to get the reward.</div>
    `;
    
    document.body.appendChild(overlay);

    let count = 5;
    const timer = setInterval(() => {
      count--;
      const timerEl = document.getElementById('reward-timer');
      const progressEl = document.getElementById('reward-progress');
      if (timerEl) timerEl.innerText = count.toString();
      if (progressEl) progressEl.style.width = `${((5-count)/5)*100}%`;
      
      if (count <= 0) {
        clearInterval(timer);
        setTimeout(() => {
          overlay.remove();
          onComplete();
        }, 500);
      }
    }, 1000);
  }
};
