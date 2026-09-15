import React from 'react';
import { Flame, Trophy, Sparkles, ChevronRight, TrendingUp } from 'lucide-react';
import { OutfitItem } from '../types';
import { TOP_20_OUTFITS } from '../data/outfits';

interface RightTop20Props {
  currentOutfitId: string;
  onSelectOutfit: (outfit: OutfitItem) => void;
}

export const RightTop20: React.FC<RightTop20Props> = ({
  currentOutfitId,
  onSelectOutfit,
}) => {
  return (
    <aside
      id="target-top20"
      className="w-full h-full flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-xs p-4 sm:p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 mb-0.5">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>지금 인기 있는 코디</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">TOP 코디 20</h3>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> 실시간 큐레이션
        </span>
      </div>

      <p className="text-[11px] text-slate-400 mb-3 leading-snug">
        사용자들이 가장 많이 저장하고 공유한 인기 스타일입니다. 카드를 누르면 즉시 메인 화면에 반영됩니다.
      </p>

      {/* List with Anchoring: Ranks 1-3 are larger cards */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2.5 pr-1 max-h-[calc(100vh-210px)]">
        {TOP_20_OUTFITS.map((outfit) => {
          const isTop3 = outfit.rank !== undefined && outfit.rank <= 3;
          const isSelected = outfit.id === currentOutfitId;

          return (
            <div
              key={outfit.id}
              onClick={() => onSelectOutfit(outfit)}
              className={`group cursor-pointer rounded-2xl border transition-all duration-200 relative ${
                isTop3 ? 'p-3' : 'p-2.5'
              } ${
                isSelected
                  ? 'bg-violet-50/80 border-violet-500 shadow-xs ring-2 ring-violet-400/30'
                  : 'bg-slate-50/60 border-slate-200/70 hover:bg-white hover:border-violet-200 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge with Anchoring */}
                <div
                  className={`shrink-0 flex items-center justify-center font-mono font-black rounded-xl ${
                    outfit.rank === 1
                      ? 'w-8 h-8 bg-amber-500 text-white shadow-xs shadow-amber-200 text-sm'
                      : outfit.rank === 2
                      ? 'w-8 h-8 bg-slate-700 text-white text-sm'
                      : outfit.rank === 3
                      ? 'w-8 h-8 bg-amber-700 text-white text-sm'
                      : 'w-6 h-6 bg-slate-200/80 text-slate-600 text-xs'
                  }`}
                >
                  {String(outfit.rank).padStart(2, '0')}
                </div>

                {/* Thumbnail */}
                <div className={`overflow-hidden rounded-xl shrink-0 ${isTop3 ? 'w-14 h-18' : 'w-11 h-14'}`}>
                  <img
                    src={outfit.imageUrl}
                    alt={outfit.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold text-violet-700 bg-violet-100/80 px-1.5 py-0.2 rounded">
                      {outfit.season}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate">
                      {outfit.gender} · {outfit.age}
                    </span>
                  </div>

                  <h4 className={`font-bold text-slate-900 truncate leading-tight ${isTop3 ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                    {outfit.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {outfit.styleCategory}
                  </p>
                </div>

                {/* Right Arrow */}
                <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all shrink-0 ${
                  isSelected ? 'text-violet-600' : ''
                }`} />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
