import React, { useState, useEffect } from 'react';
import { X, Clock, HelpCircle, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';

interface FiveSecondTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const FiveSecondTestModal: React.FC<FiveSecondTestModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'intro' | 'counting' | 'questions'>('intro');
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isOpen) {
      setPhase('intro');
      setSecondsLeft(5);
      setRevealedAnswers({});
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'counting' && secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (phase === 'counting' && secondsLeft === 0) {
      setPhase('questions');
    }
    return () => clearTimeout(timer);
  }, [phase, secondsLeft]);

  if (!isOpen) return null;

  const startTest = () => {
    setPhase('counting');
    setSecondsLeft(5);
  };

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (next.q1 && next.q2 && next.q3 && onComplete) {
        onComplete();
      }
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div
        id="target-five-sec"
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-violet-100 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {phase === 'intro' && (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <span className="text-xs font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-2.5 py-1 rounded-full">
              STEP 09 · 지식의 저주 탈피
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-3">
              5초 테스트 (5-Second Test)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-md mx-auto">
              처음 방문한 사용자는 5초 안에 3가지 질문에 즉각 답할 수 있어야 합니다.
              <br />
              <strong className="text-violet-700">시작 버튼</strong>을 누르면 5초간 화면을 떠올린 후 3대 질문을 검증합니다.
            </p>

            <button
              onClick={startTest}
              className="w-full py-3.5 px-6 rounded-2xl bg-violet-600 text-white font-bold text-sm shadow-lg shadow-violet-200 hover:bg-violet-700 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>5초 테스트 시작하기</span>
            </button>
          </div>
        )}

        {phase === 'counting' && (
          <div className="text-center py-10">
            <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
              화면을 눈에 담아보세요!
            </span>
            <div className="text-7xl font-extrabold text-violet-600 font-mono my-4 animate-bounce">
              {secondsLeft}
            </div>
            <p className="text-sm text-slate-500">
              무엇을 하는지, 누구를 위한지, 무엇을 눌러야 하는지 주목하세요.
            </p>
          </div>
        )}

        {phase === 'questions' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
                  테스트 검증
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">
                  5초 동안 첫 화면만 보고 답해보세요
                </h4>
              </div>
              <button
                onClick={startTest}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-violet-600 px-2 py-1 rounded-lg hover:bg-violet-50 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> 다시 측정
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {/* Q1 */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Q1. 무엇을 하는 서비스인가요?</span>
                  </div>
                  <button
                    onClick={() => toggleAnswer('q1')}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-800 bg-white px-2.5 py-1 rounded-lg border border-violet-200 shadow-2xs"
                  >
                    {revealedAnswers.q1 ? '숨기기' : '정답 확인'}
                  </button>
                </div>
                {revealedAnswers.q1 && (
                  <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 animate-in fade-in">
                    <strong>모범 답안:</strong> AI 맞춤 코디 추천 서비스 ("오늘 뭐 입지? 고민 해결")
                  </div>
                )}
              </div>

              {/* Q2 */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Q2. 누구를 위한 서비스인가요?</span>
                  </div>
                  <button
                    onClick={() => toggleAnswer('q2')}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-800 bg-white px-2.5 py-1 rounded-lg border border-violet-200 shadow-2xs"
                  >
                    {revealedAnswers.q2 ? '숨기기' : '정답 확인'}
                  </button>
                </div>
                {revealedAnswers.q2 && (
                  <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 animate-in fade-in">
                    <strong>모범 답안:</strong> 10대부터 60대까지 계절과 연령별 패션 선택이 필요한 사람
                  </div>
                )}
              </div>

              {/* Q3 */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">Q3. 무엇을 눌러야 하나요?</span>
                  </div>
                  <button
                    onClick={() => toggleAnswer('q3')}
                    className="text-xs font-semibold text-violet-600 hover:text-violet-800 bg-white px-2.5 py-1 rounded-lg border border-violet-200 shadow-2xs"
                  >
                    {revealedAnswers.q3 ? '숨기기' : '정답 확인'}
                  </button>
                </div>
                {revealedAnswers.q3 && (
                  <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 animate-in fade-in">
                    <strong>모범 답안:</strong> 화면 중앙의 필터(계절/성별/연령) 선택 후 추천 코디 카드
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (onComplete) onComplete();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>5초 테스트 완료 처리</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
