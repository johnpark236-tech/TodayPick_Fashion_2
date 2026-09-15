import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  Maximize2, 
  FileText, 
  Volume2, 
  Sparkles, 
  Grid, 
  Square, 
  ChevronDown,
  ChevronRight,
  Check,
  Thermometer,
  MapPin,
  Flame,
  ArrowDown
} from 'lucide-react';
import { OutfitItem, Season, Gender, AgeGroup } from '../types';

interface CenterAppProps {
  currentOutfit: OutfitItem;
  season: Season;
  setSeason: (s: Season) => void;
  gender: Gender;
  setGender: (g: Gender) => void;
  age: AgeGroup;
  setAge: (a: AgeGroup) => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onOpenZoom: () => void;
  onOpenDetail: () => void;
  onShare: () => void;
  isTenLookView: boolean;
  onToggleTenLookView: () => void;
  tenLookSet: OutfitItem[];
  onSelectCut: (outfit: OutfitItem) => void;
  onLoadMore: () => void;
  hasMoreSets: boolean;
  onActionClick?: (actionName: string) => void;
}

const SEASONS: Season[] = ['봄', '여름', '가을', '겨울'];
const GENDERS: Gender[] = ['여성', '남성', '유니섹스'];
const AGE_GROUPS: AgeGroup[] = ['10대', '20대', '30대', '40대', '50대 이상'];

export const CenterApp: React.FC<CenterAppProps> = ({
  currentOutfit,
  season,
  setSeason,
  gender,
  setGender,
  age,
  setAge,
  isSaved,
  onToggleSave,
  onOpenZoom,
  onOpenDetail,
  onShare,
  isTenLookView,
  onToggleTenLookView,
  tenLookSet,
  onSelectCut,
  onLoadMore,
  hasMoreSets,
  onActionClick,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Web Speech API Voice synthesis for "음성" action
  const handleVoicePlay = () => {
    if (onActionClick) onActionClick('voice');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `${currentOutfit.title}. ${currentOutfit.description}. 추천 상황은 ${currentOutfit.situation}입니다.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsPlayingVoice(true);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('음성 안내: ' + currentOutfit.title);
    }
  };

  const handleShareClick = () => {
    if (onActionClick) onActionClick('share');
    onShare();
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <main
      id="target-center-app"
      className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 flex flex-col relative transition-all"
    >
      {/* 5-Second Test Guardrail Header (§1) */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200/70 text-violet-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>오늘의 AI 맞춤 스타일 추천</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          오늘 뭐 입지? TodayPick이 골라드릴게요.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-lg mx-auto">
          계절과 연령, 스타일에 맞는 오늘의 코디를 쉽고 빠르게 만나보세요.
        </p>
      </div>

      {/* Choice Architecture: Exactly 3 Filter Dimensions (§3.5, Hick's Law) */}
      <div className="bg-slate-50/80 p-3 sm:p-4 rounded-2xl border border-slate-200/80 mb-5 space-y-3">
        {/* 1. 계절 필터 (STEP 1 in 3-click rule) */}
        <div id="target-season" className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 w-12 shrink-0">계절</span>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {SEASONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSeason(s);
                  if (onActionClick) onActionClick('season');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  season === s
                    ? 'bg-violet-600 text-white shadow-xs shadow-violet-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 2. 성별 필터 (STEP 2 in 3-click rule) */}
        <div id="target-gender" className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 w-12 shrink-0">성별</span>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {GENDERS.map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGender(g);
                  if (onActionClick) onActionClick('gender');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  gender === g
                    ? 'bg-violet-600 text-white shadow-xs shadow-violet-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 연령 필터 */}
        <div id="target-age" className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 w-12 shrink-0">연령대</span>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {AGE_GROUPS.map((a) => (
              <button
                key={a}
                onClick={() => {
                  setAge(a);
                  if (onActionClick) onActionClick('age');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  age === a
                    ? 'bg-violet-600 text-white shadow-xs shadow-violet-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dominant Visual: Outfit Card (Von Restorff Effect, 50-55% prominence) */}
      <div
        id="target-main-outfit"
        className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-md group aspect-[4/5] sm:aspect-[16/11] max-h-[560px] flex items-center justify-center transition-all cursor-pointer"
        onClick={() => {
          if (onActionClick) onActionClick('main-outfit');
        }}
      >
        <img
          src={currentOutfit.sheetUrl || currentOutfit.imageUrl}
          alt={currentOutfit.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
        />

        {/* Subtle Dark Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
          <span className="px-3 py-1 rounded-full bg-violet-600/90 text-white text-xs font-bold backdrop-blur-md shadow-xs">
            {currentOutfit.season} 큐레이션
          </span>
          <span className="px-2.5 py-1 rounded-full bg-black/40 text-white/90 text-xs font-medium backdrop-blur-md border border-white/20">
            {currentOutfit.gender} · {currentOutfit.age}
          </span>
          {currentOutfit.rank && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-black shadow-xs flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" /> TOP {currentOutfit.rank}
            </span>
          )}
        </div>

        {/* Round Floating Action Buttons (§10, Fogg Behavior Model B=MAP) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          {/* 저장 (Save - Heart) */}
          <button
            id="target-save"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
              if (onActionClick) onActionClick('save');
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 ${
              isSaved
                ? 'bg-rose-500 text-white shadow-rose-300'
                : 'bg-white/90 hover:bg-white text-slate-700 shadow-black/20 hover:scale-105'
            }`}
            title={isSaved ? '내 코디에서 삭제' : '내 코디에 저장 (보유 효과)'}
            aria-label="저장"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
          </button>

          {/* 공유 (Share) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShareClick();
            }}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center transition-all shadow-md shadow-black/20 hover:scale-105 active:scale-90"
            title="코디 링크 공유하기"
            aria-label="공유"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* 확대 (Zoom Lightbox) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenZoom();
              if (onActionClick) onActionClick('zoom');
            }}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center transition-all shadow-md shadow-black/20 hover:scale-105 active:scale-90"
            title="고화질 확대 보기"
            aria-label="확대"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* 상세 (Garment Breakdown Popover) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail();
              if (onActionClick) onActionClick('detail');
            }}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center transition-all shadow-md shadow-black/20 hover:scale-105 active:scale-90"
            title="아이템 상세 정보"
            aria-label="상세"
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* 음성 (TTS Styling Tip) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleVoicePlay();
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md shadow-black/20 hover:scale-105 active:scale-90 ${
              isPlayingVoice
                ? 'bg-violet-600 text-white animate-pulse'
                : 'bg-white/90 hover:bg-white text-slate-700'
            }`}
            title="오디오 코디 팁 듣기"
            aria-label="음성"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Content Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-200 mb-1">
            <span>{currentOutfit.styleCategory}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Thermometer className="w-3 h-3" /> {currentOutfit.tempRange}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1">
            {currentOutfit.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
            {currentOutfit.description}
          </p>

          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/20">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-violet-300 shrink-0" />
              <span className="truncate">{currentOutfit.situation}</span>
            </div>
            <span className="text-[11px] font-mono text-violet-200 shrink-0">
              Cut #{currentOutfit.cutIndex} / 10
            </span>
          </div>
        </div>

        {/* Toast alert on share/save */}
        {copiedToast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-4 py-2 rounded-2xl bg-black/80 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-md shadow-xl animate-in zoom-in-90">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>클립보드에 코디 링크가 복사되었습니다!</span>
          </div>
        )}
      </div>

      {/* View Switcher: Single Look vs 10-Look Set (§11, Zeigarnik Effect) */}
      <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {/* 10개 코디 보기 / 1컷 보기 Button */}
          <button
            id="target-ten-look"
            onClick={() => {
              onToggleTenLookView();
              if (onActionClick) onActionClick('ten-look');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isTenLookView
                ? 'bg-violet-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isTenLookView ? (
              <>
                <Square className="w-3.5 h-3.5" />
                <span>1컷 보기로 접기</span>
              </>
            ) : (
              <>
                <Grid className="w-3.5 h-3.5" />
                <span>10개 코디 보기</span>
              </>
            )}
          </button>

          <span className="text-xs text-slate-400 hidden sm:inline">
            동일 무드의 10가지 룩북 세트
          </span>
        </div>

        {/* 더보기 버튼 (Load More Set, §11) */}
        <button
          id="target-load-more"
          onClick={() => {
            onLoadMore();
            if (onActionClick) onActionClick('load-more');
          }}
          disabled={!hasMoreSets}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            hasMoreSets
              ? 'bg-white text-violet-700 border border-violet-200 hover:bg-violet-50 active:scale-95'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          <span>더보기 (+10)</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 10-Look Multi-Cut Grid Panel (§11) */}
      {isTenLookView && (
        <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              세트 내 10가지 스타일 컷 (클릭 시 메인 뷰 즉시 교체)
            </span>
            <span className="text-[11px] text-violet-600 font-mono">
              {tenLookSet.length} Cuts
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {tenLookSet.map((item, idx) => {
              const isSelected = item.id === currentOutfit.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectCut(item)}
                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    isSelected
                      ? 'border-violet-600 ring-2 ring-violet-300 shadow-xs scale-105'
                      : 'border-transparent hover:border-violet-300 hover:scale-102 opacity-80 hover:opacity-100'
                  }`}
                  title={`${item.title} (Cut #${item.cutIndex})`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] font-mono text-white text-center py-0.5">
                    #{item.cutIndex}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};
