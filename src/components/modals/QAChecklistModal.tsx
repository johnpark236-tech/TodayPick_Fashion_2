import React, { useState } from 'react';
import { X, CheckSquare, Square, Trophy, CheckCircle, Sparkles, Check } from 'lucide-react';

interface QAChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const QA_ITEMS = [
  '5초 테스트 통과 (무엇인지/누구를 위한지/무엇을 누를지 5초 내 식별)',
  '3클릭 규칙 통과 (계절 → 성별/연령 → 코디 도달)',
  '학습 단계 버튼 노출 (01~10 기획부터 배포까지)',
  '레슨 요약 간결함 (전 레슨 40자 내외 핵심 압축)',
  '하이라이트 링이 타겟을 정확히 추적함 (DOM-Ref 기반)',
  '타겟 클릭 완료 처리 정상 작동',
  '다음 단계 진행 정상 작동',
  '센터 앱이 시각적으로 압도적임 (50~55% Von Restorff 유지)',
  'TOP20 인터랙션 정상 (1~3위 앵커링 & 클릭 즉시 센터 반영)',
  '1컷 / 10컷 전환 정상 (단일 룩 및 세트 그리드)',
  '더보기 정상 (세트 경계 유지)',
  '모바일 학습 바텀시트 정상 작동',
  '모바일 하이라이트 정렬 정상',
  '가로 스크롤 없음 (모바일 반응형 완벽 준수)',
  '거짓 긴급성 배제 및 누적 방문자 수 [예시 데이터] 라벨 표기 완료',
  'TodayPick 정체성이 신선하고 모던함 (소프트 바이올렛/스카이블루 팔레트)',
];

export const QAChecklistModal: React.FC<QAChecklistModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [checkedIndices, setCheckedIndices] = useState<Set<number>>(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));

  if (!isOpen) return null;

  const toggleItem = (idx: number) => {
    setCheckedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const isAllChecked = checkedIndices.size === QA_ITEMS.length;

  const checkAll = () => {
    setCheckedIndices(new Set(QA_ITEMS.map((_, i) => i)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div
        id="target-qa-checklist"
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
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
              STEP 10 · 절정-대미(Peak-End) 법칙
            </span>
            <h3 className="text-xl font-bold text-slate-900">최종 QA 16대 점검표</h3>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mb-4">
          <p className="text-xs text-slate-500">
            실습의 마무리는 100% 신뢰할 수 있는 품질 검증입니다. ({checkedIndices.size}/{QA_ITEMS.length})
          </p>
          <button
            onClick={checkAll}
            className="text-xs font-semibold text-violet-600 hover:text-violet-800 bg-violet-50 px-2.5 py-1 rounded-lg"
          >
            전체 체크
          </button>
        </div>

        {/* 16 Checklist Items */}
        <div className="space-y-2 mb-6">
          {QA_ITEMS.map((item, idx) => {
            const isChecked = checkedIndices.has(idx);
            return (
              <button
                key={idx}
                onClick={() => toggleItem(idx)}
                className={`w-full flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs transition-colors ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800 font-medium'
                    : 'bg-slate-50/50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <div className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded border border-slate-300 bg-white" />
                  )}
                </div>
                <span className="leading-snug">{item}</span>
              </button>
            );
          })}
        </div>

        {/* Peak-End Celebratory State */}
        {isAllChecked && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white mb-5 shadow-lg shadow-violet-200 text-center animate-in zoom-in-95">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>전 항목 검증 통과</span>
            </div>
            <h4 className="text-2xl font-black tracking-tight mb-1">실습 완료.</h4>
            <p className="text-xs text-violet-100 max-w-md mx-auto">
              축하합니다! 기획, 심리학적 행동 모델, 3클릭 규칙, 컴포넌트 아키텍처부터 배포까지 TodayPick의 모든 제작 과정을 성공적으로 수료하셨습니다.
            </p>
          </div>
        )}

        <button
          onClick={() => {
            if (onComplete) onComplete();
            onClose();
          }}
          disabled={!isAllChecked}
          className={`w-full py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
            isAllChecked
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>실습 완료 확정하기</span>
        </button>
      </div>
    </div>
  );
};
