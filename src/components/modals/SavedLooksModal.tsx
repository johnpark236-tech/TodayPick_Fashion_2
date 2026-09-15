import React from 'react';
import { X, Bookmark, Trash2, ExternalLink, Sparkles, Shirt } from 'lucide-react';
import { OutfitItem } from '../../types';

interface SavedLooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOutfits: OutfitItem[];
  onRemove: (id: string) => void;
  onSelectOutfit: (outfit: OutfitItem) => void;
}

export const SavedLooksModal: React.FC<SavedLooksModalProps> = ({
  isOpen,
  onClose,
  savedOutfits,
  onRemove,
  onSelectOutfit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div
        id="target-saved-modal"
        className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-violet-100 relative max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
              보유 효과 (Endowment Effect)
            </span>
            <h3 className="text-xl font-bold text-slate-900">내 코디 보관함 ({savedOutfits.length})</h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          마음에 들어 저장한 룩은 나의 소중한 옷장 컬렉션이 됩니다. 언제든 다시 꺼내보고 오늘 스타일에 영감을 받으세요.
        </p>

        {savedOutfits.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
            <Shirt className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">아직 저장한 코디가 없습니다</p>
            <p className="text-xs text-slate-400 mt-1">
              메인 화면에서 마음에 드는 코디의 하트(저장) 버튼을 눌러 나만의 룩북을 채워보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {savedOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="group p-3 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-violet-300 hover:shadow-md transition-all flex gap-3 relative"
              >
                <img
                  src={outfit.imageUrl}
                  alt={outfit.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[10px] font-semibold text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded">
                        {outfit.season}
                      </span>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {outfit.gender} · {outfit.age}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 truncate">{outfit.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{outfit.styleCategory}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                    <button
                      onClick={() => {
                        onSelectOutfit(outfit);
                        onClose();
                      }}
                      className="text-[11px] font-bold text-violet-600 hover:text-violet-800 flex items-center gap-1"
                    >
                      <span>보기</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemove(outfit.id)}
                      className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors"
                      title="보관함에서 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
