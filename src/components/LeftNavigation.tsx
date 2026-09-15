import React from 'react';
import { Shirt, Flame, Bookmark, Info, UtensilsCrossed, Compass, Lock } from 'lucide-react';
import { ActiveTab } from '../types';

interface LeftNavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  savedCount: number;
  currentStep: number;
  onSelectStep: (stepNumber: number) => void;
  completedSteps: Set<number>;
  onOpenIntroModal?: () => void;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({ activeTab, onSelectTab, savedCount }) => (
  <aside className="w-full h-full flex flex-col py-2 text-slate-700 select-none">
    <div className="space-y-6">
      <div>
        <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">서비스 메뉴</div>
        <nav className="space-y-1">
          <button onClick={() => onSelectTab('outfit')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'outfit' ? 'bg-violet-600 text-white shadow-sm shadow-violet-200' : 'text-slate-700 hover:bg-violet-50/70 hover:text-violet-700'}`}>
            <div className="flex items-center gap-2.5"><Shirt className="w-4 h-4" /><span>오늘뭐입지</span></div><span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${activeTab === 'outfit' ? 'bg-violet-500/80 text-white' : 'bg-emerald-100 text-emerald-700'}`}>LIVE</span>
          </button>
          <button id="target-nav-top20" onClick={() => onSelectTab('top20')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'top20' ? 'bg-violet-600 text-white shadow-sm shadow-violet-200' : 'text-slate-700 hover:bg-violet-50/70 hover:text-violet-700'}`}>
            <div className="flex items-center gap-2.5"><Flame className="w-4 h-4 text-amber-500" /><span>TOP 코디 20</span></div>
          </button>
          <button id="target-nav-saved" onClick={() => onSelectTab('saved')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'saved' ? 'bg-violet-600 text-white shadow-sm shadow-violet-200' : 'text-slate-700 hover:bg-violet-50/70 hover:text-violet-700'}`}>
            <div className="flex items-center gap-2.5"><Bookmark className="w-4 h-4 text-violet-500" /><span>내 코디</span></div>{savedCount > 0 && <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === 'saved' ? 'bg-white text-violet-700' : 'bg-violet-100 text-violet-700'}`}>{savedCount}</span>}
          </button>
          <button onClick={() => { onSelectTab('about'); document.getElementById('landing-problem')?.scrollIntoView({ behavior: 'smooth' }); }} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'about' ? 'bg-violet-600 text-white' : 'text-slate-600 hover:bg-violet-50/70 hover:text-violet-700'}`}>
            <Info className="w-4 h-4 text-slate-400" /><span>TodayPick 소개</span>
          </button>
        </nav>
      </div>
      <div>
        <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">로드맵 준비 중</div>
        <div className="space-y-1">
          <button onClick={() => onSelectTab('food_locked')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 bg-slate-100/50 hover:bg-slate-100 transition-colors"><div className="flex items-center gap-2"><UtensilsCrossed className="w-3.5 h-3.5" /><span>오늘뭐먹지</span></div><span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-200/70 px-1.5 py-0.5 rounded"><Lock className="w-2.5 h-2.5" /> 준비 중</span></button>
          <button onClick={() => onSelectTab('activity_locked')} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 bg-slate-100/50 hover:bg-slate-100 transition-colors"><div className="flex items-center gap-2"><Compass className="w-3.5 h-3.5" /><span>오늘뭐하지</span></div><span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-200/70 px-1.5 py-0.5 rounded"><Lock className="w-2.5 h-2.5" /> 준비 중</span></button>
        </div>
      </div>
    </div>
  </aside>
);
