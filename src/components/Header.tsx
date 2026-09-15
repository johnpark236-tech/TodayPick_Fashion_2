import React from 'react';
import { Sparkles, Clock, Smartphone, Monitor, BookOpen, Menu } from 'lucide-react';
import { getGreetingByTime } from '../data/outfits';

interface HeaderProps {
  isMobilePreview: boolean;
  onToggleMobilePreview: () => void;
  learningStep: number;
  totalLessons: number;
  completedStepsCount: number;
  onOpenMobileMenu: () => void;
  onToggleLearningMode: () => void;
  isLearningModeOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isMobilePreview,
  onToggleMobilePreview,
  learningStep,
  totalLessons,
  completedStepsCount,
  onOpenMobileMenu,
  onToggleLearningMode,
  isLearningModeOpen,
}) => {
  const { greeting } = getGreetingByTime();

  return (
    <header
      id="target-header"
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-violet-100/80 px-4 lg:px-8 py-3 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-violet-50 transition-colors"
            aria-label="메뉴 열기"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>

          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-violet-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900 font-sans">TodayPick</span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">v2.0</span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">오늘 뭐 입지? 고민 해결 코디네이터</p>
            </div>
          </a>
        </div>

        {/* Center: Real Local Time Greeting (Present Bias / Temporal Framing) */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-slate-600 text-xs font-medium">
          <Clock className="w-3.5 h-3.5 text-violet-500" />
          <span>{greeting}, 오늘의 날씨와 일정에 맞는 룩을 추천해드려요</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile QA Preview Toggle button (Lesson 08) */}
          <button
            id="target-mobile-toggle"
            onClick={onToggleMobilePreview}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isMobilePreview
                ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
                : 'bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:bg-violet-50/50'
            }`}
            title="모바일 프레임 QA 뷰 전환 (피츠의 법칙/가로스크롤 점검)"
          >
            {isMobilePreview ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>데스크톱 뷰</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>모바일 QA 뷰</span>
              </>
            )}
          </button>

          {/* Learning Mode Rail Quick Button */}
          <button
            onClick={onToggleLearningMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isLearningModeOpen
                ? 'bg-violet-50 text-violet-700 border-violet-200 ring-2 ring-violet-400/20'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-violet-600" />
            <span className="hidden sm:inline">실습 모드</span>
            <span className="px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold">
              {completedStepsCount}/{totalLessons}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
