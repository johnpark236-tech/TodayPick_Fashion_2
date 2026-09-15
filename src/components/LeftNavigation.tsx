import React from 'react';
import { 
  Shirt, 
  Flame, 
  Bookmark, 
  Info, 
  UtensilsCrossed, 
  Compass, 
  Lock, 
  CheckCircle2, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../types';
import { LESSONS } from '../data/lessons';

interface LeftNavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  savedCount: number;
  currentStep: number;
  onSelectStep: (stepNumber: number) => void;
  completedSteps: Set<number>;
  onOpenIntroModal?: () => void;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
  currentStep,
  onSelectStep,
  completedSteps,
}) => {
  const completedCount = completedSteps.size;
  const progressPercent = Math.round((completedCount / LESSONS.length) * 100);

  return (
    <aside className="w-full h-full flex flex-col justify-between py-2 text-slate-700 select-none">
      {/* 1. Primary Product Menu (Flat, 0-friction, Hick's Law) */}
      <div className="space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            서비스 메뉴
          </div>
          <nav className="space-y-1">
            {/* 오늘뭐입지 (Core) */}
            <button
              onClick={() => onSelectTab('outfit')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'outfit'
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-200'
                  : 'text-slate-700 hover:bg-violet-50/70 hover:text-violet-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shirt className="w-4 h-4" />
                <span>오늘뭐입지</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                activeTab === 'outfit' ? 'bg-violet-500/80 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}>
                LIVE
              </span>
            </button>

            {/* TOP 코디 */}
            <button
              id="target-nav-top20"
              onClick={() => onSelectTab('top20')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'top20'
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-200'
                  : 'text-slate-700 hover:bg-violet-50/70 hover:text-violet-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>TOP 코디 20</span>
              </div>
            </button>

            {/* 내 코디 (Endowment Effect) */}
            <button
              id="target-nav-saved"
              onClick={() => onSelectTab('saved')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'saved'
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-200'
                  : 'text-slate-700 hover:bg-violet-50/70 hover:text-violet-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-violet-500" />
                <span>내 코디</span>
              </div>
              {savedCount > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'saved' ? 'bg-white text-violet-700' : 'bg-violet-100 text-violet-700'
                }`}>
                  {savedCount}
                </span>
              )}
            </button>

            {/* TodayPick 소개 */}
            <button
              onClick={() => {
                onSelectTab('about');
                const el = document.getElementById('landing-problem');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-600 hover:bg-violet-50/70 hover:text-violet-700'
              }`}
            >
              <Info className="w-4 h-4 text-slate-400" />
              <span>TodayPick 소개</span>
            </button>
          </nav>
        </div>

        {/* Roadmap Modules (Pratfall effect used honestly) */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            로드맵 준비 중
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onSelectTab('food_locked')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 bg-slate-100/50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>오늘뭐먹지</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-200/70 px-1.5 py-0.5 rounded">
                <Lock className="w-2.5 h-2.5" /> 준비 중
              </span>
            </button>

            <button
              onClick={() => onSelectTab('activity_locked')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 bg-slate-100/50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" />
                <span>오늘뭐하지</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-200/70 px-1.5 py-0.5 rounded">
                <Lock className="w-2.5 h-2.5" /> 준비 중
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Visual Separation: Distinct System for Learning Mode (§6) */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 bg-slate-50/70 -mx-2 px-3 py-3 rounded-2xl border border-violet-100/60 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-bold text-slate-800 tracking-tight">수업 진행 순서</span>
          </div>
          <span className="text-[11px] font-semibold text-violet-700">
            {completedCount} / {LESSONS.length} 완료
          </span>
        </div>

        {/* Goal-Gradient Effect: Persistent thin progress bar (§6) */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 10 Step Buttons */}
        <div className="grid grid-cols-2 gap-1.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-0.5">
          {LESSONS.map((lesson) => {
            const isCurrent = currentStep === lesson.step;
            const isCompleted = completedSteps.has(lesson.step);

            return (
              <button
                key={lesson.step}
                onClick={() => onSelectStep(lesson.step)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-xs transition-all ${
                  isCurrent
                    ? 'bg-violet-600 text-white font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-medium'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <span className={`text-[10px] px-1 rounded font-mono ${
                  isCurrent ? 'bg-white/20 text-white' : 'text-slate-400'
                }`}>
                  {String(lesson.step).padStart(2, '0')}
                </span>
                <span className="truncate flex-1 text-[11px]">{lesson.title}</span>
                {isCompleted && (
                  <CheckCircle2 className={`w-3 h-3 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-2 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
          <span>단계를 누르면 실습 가이드가 열립니다</span>
        </div>
      </div>
    </aside>
  );
};
