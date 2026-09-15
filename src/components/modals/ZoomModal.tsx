import React from 'react';
import { X } from 'lucide-react';
import { OutfitItem } from '../../types';

interface ZoomModalProps {
  outfit: OutfitItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ZoomModal: React.FC<ZoomModalProps> = ({ outfit, isOpen, onClose }) => {
  if (!isOpen || !outfit) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative overflow-hidden bg-slate-900 flex items-center justify-center">
          <img
            src={outfit.sheetUrl || outfit.imageUrl}
            alt={outfit.title}
            referrerPolicy="no-referrer"
            className="w-full max-h-[75vh] object-contain"
          />
        </div>

        <div className="p-4 sm:p-5 bg-white flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[11px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded">
                {outfit.season}
              </span>
              <span className="text-xs text-slate-500">
                {outfit.gender} · {outfit.age} · {outfit.styleCategory}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">{outfit.title}</h4>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Cut #{outfit.cutIndex} / 10
          </div>
        </div>
      </div>
    </div>
  );
};
