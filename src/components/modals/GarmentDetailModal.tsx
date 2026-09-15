import React from 'react';
import { X, Tag, Thermometer, MapPin, Palette, Sparkles, Shirt } from 'lucide-react';
import { OutfitItem } from '../../types';

interface GarmentDetailModalProps {
  outfit: OutfitItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GarmentDetailModal: React.FC<GarmentDetailModalProps> = ({
  outfit,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !outfit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-violet-100 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-violet-600 mb-1">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <span>코디 상세 아이템 정보</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{outfit.title}</h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">{outfit.description}</p>

        {/* Garment Breakdown */}
        <div className="space-y-2.5 mb-5">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Shirt className="w-3.5 h-3.5 text-violet-600" />
            <span>착용 아이템 상세</span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            {outfit.garments.outer && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 shrink-0">아우터</span>
                <span className="text-slate-700 font-medium">{outfit.garments.outer}</span>
              </div>
            )}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 shrink-0">상의</span>
              <span className="text-slate-700 font-medium">{outfit.garments.top}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 shrink-0">하의</span>
              <span className="text-slate-700 font-medium">{outfit.garments.bottom}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 shrink-0">신발</span>
              <span className="text-slate-700 font-medium">{outfit.garments.shoes}</span>
            </div>
            {outfit.garments.accessories && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 shrink-0">액세서리</span>
                <span className="text-slate-700 font-medium">{outfit.garments.accessories}</span>
              </div>
            )}
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-5">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
            <Palette className="w-3.5 h-3.5 text-violet-600" />
            <span>컬러 하모니 팔레트</span>
          </div>
          <div className="flex items-center gap-2">
            {outfit.colorPalette.map((col, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                <div
                  className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: col }}
                />
                <span className="text-[10px] font-mono text-slate-500">{col}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-violet-50/50 border border-violet-100 text-slate-700">
            <Thermometer className="w-4 h-4 text-violet-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">추천 기온</div>
              <div className="font-semibold">{outfit.tempRange}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-violet-50/50 border border-violet-100 text-slate-700">
            <MapPin className="w-4 h-4 text-violet-600 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">추천 상황</div>
              <div className="font-semibold truncate">{outfit.situation}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
