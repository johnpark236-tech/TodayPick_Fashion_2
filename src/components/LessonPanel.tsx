import React from 'react';
import { Check, ArrowRight, Sparkles, X, RotateCcw } from 'lucide-react';
import { LESSONS } from '../data/lessons';

interface LessonPanelProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  isConfirmed: boolean;
  onTriggerCheck: () => void;
  onNextStep: () => void;
  onClose?: () => void;
  onResetProgress?: () => void;
}

export const LessonPanel: React.FC<LessonPanelProps> = ({
  currentStep,
  isConfirmed,
  onTriggerCheck,
  onNextStep,
  onClose,
  onResetProgress,
}) => {
  const lesson = LESSONS.find((l) => l.step === currentStep) || LESSONS[0];
  const isLastStep = currentStep === LESSONS.length;

  return (
    <div
      id="target-lesson-panel"
      className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-violet-200/90 shadow-xl p-4 sm:p-5 w-full max-w-md transition-all duration-300"
    >
      {/* Top Bar: Step & Micro Close */}
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-violet-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-violet-600 text-white text-[11px] font-bold tracking-wider uppercase font-mono shadow-xs">
            STEP {String(lesson.step).padStart(2, '0')}
          </span>
          <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
            {lesson.psychologicalModel}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {onResetProgress && (
            <button
              onClick={onResetProgress}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 text-xs"
              title="실습 진행도 초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lesson Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-1.5 flex items-center gap-2">
        <span>{lesson.title}</span>
        {isConfirmed && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3 stroke-[3]" /> 확인 완료
          </span>
        )}
      </h3>

      {/* Summary (Enforced <= 40 chars) */}
      <p className="text-sm font-medium text-violet-950 bg-violet-50/70 p-2.5 rounded-xl border border-violet-100/60 mb-3.5 leading-relaxed">
        "{lesson.summary}"
      </p>

      {/* TodayPick Application Points */}
      <div className="mb-4">
        <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>TodayPick 적용:</span>
        </div>
        <ul className="space-y-1.5 pl-1 text-xs text-slate-600">
          {lesson.appliedPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-1.5 leading-snug">
              <span className="text-violet-500 font-bold shrink-0 mt-0.5">–</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons: Directly Check & Next Step */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={onTriggerCheck}
          className="flex-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-violet-100/80 text-violet-800 hover:bg-violet-200/90 transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-violet-600 animate-ping" />
          <span>직접 확인해보기</span>
        </button>

        <button
          onClick={onNextStep}
          disabled={!isConfirmed}
          className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            isConfirmed
              ? 'bg-violet-600 text-white shadow-md shadow-violet-300 hover:bg-violet-700 active:scale-95 cursor-pointer'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          <span>{isLastStep ? '실습 완료' : '다음 단계'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Micro Status Tip */}
      <div className="mt-2 text-[10px] text-center text-slate-400">
        {isConfirmed
          ? '확인되었습니다. [다음 단계]를 눌러 여정을 이어가세요.'
          : `${lesson.instruction}`}
      </div>
    </div>
  );
};
