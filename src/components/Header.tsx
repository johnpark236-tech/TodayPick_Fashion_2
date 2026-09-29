import React from 'react';
import { Sparkles, Clock, Menu, Smartphone, BookOpen } from 'lucide-react';
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

const APP_URL = 'https://manus.im/app-preview/jZeN2r5fMNSRyTzWZQKj4c?sessionId=HLNaZcXocOlJM5qsjqzgfA';
const BLOG_URL = 'https://todaypick-mannal.tistory.com/';

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { greeting } = getGreetingByTime();

  return (
    <header id="target-header" className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-violet-100/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={onOpenMobileMenu} className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-violet-50 transition-colors" aria-label="메뉴 열기">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-violet-200 group-hover:scale-105 transition-transform"><Sparkles className="w-5 h-5" /></div>
            <div>
              <div className="flex items-center gap-1.5"><span className="font-bold text-lg tracking-tight text-slate-900 font-sans">TodayPick</span><span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">v2.0</span></div>
              <p className="text-[11px] text-slate-400 hidden sm:block">오늘 뭐 입지? 고민 해결 코디네이터</p>
            </div>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-slate-600 text-xs font-medium">
          <Clock className="w-3.5 h-3.5 text-violet-500" />
          <span>{greeting}, 오늘의 날씨와 일정에 맞는 룩을 추천해드려요</span>
        </div>
        <nav className="hidden md:flex items-center gap-2" aria-label="TodayPick 서비스 이동">
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 bg-white hover:border-violet-300 hover:text-violet-700 transition-colors inline-flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            스타일 매거진
          </a>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-sm transition-colors inline-flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            앱 체험
          </a>
        </nav>
      </div>
    </header>
  );
};
