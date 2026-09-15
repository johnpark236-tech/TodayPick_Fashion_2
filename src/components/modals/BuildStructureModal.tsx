import React from 'react';
import { X, Layers, Layout, Eye, CheckCircle2, ChevronRight } from 'lucide-react';

interface BuildStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const BuildStructureModal: React.FC<BuildStructureModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  if (!isOpen) return null;

  const components = [
    {
      name: 'Header',
      role: '시간대별 그리팅(시간 프레이밍) & 모바일 QA 뷰포트 토글',
      tags: ['Temporal Framing', 'Responsive Control'],
    },
    {
      name: 'SideMenu (LeftNavigation)',
      role: 'Hick의 법칙 기반 0-depth 메뉴 & 분리된 수업 진행 레일 (목표 구배 효과)',
      tags: ["Hick's Law", 'Goal-Gradient Effect'],
    },
    {
      name: 'TodayPickExperience (CenterApp)',
      role: '가운데 50~55% 압도적 뷰포트 (Von Restorff) & 3필터 캡 (선택의 역설 방지)',
      tags: ['Von Restorff', 'Paradox of Choice', 'Fogg Model'],
    },
    {
      name: 'TopLooksPanel (RightTop20)',
      role: '앵커링(1~3위 확대 카드) & 조작 없는 순수 랭킹 큐레이션',
      tags: ['Anchoring', 'Social Proof'],
    },
    {
      name: 'LandingSections (AIDA Funnel)',
      role: 'Hero → Problem → Solution → Social Proof → FAQ → CTA 순차 전개',
      tags: ['AIDA Funnel', 'Bandwagon Effect'],
    },
    {
      name: 'HighlightRing System',
      role: 'DOM-Ref 기반 유연한 실습 가이드 링 & 힉의 법칙 3클릭 튜토리얼',
      tags: ['Guided Onboarding', 'DOM Tracking'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div
        id="target-build-structure"
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
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
              STEP 05 · 컴포넌트 아키텍처
            </span>
            <h3 className="text-xl font-bold text-slate-900">TodayPick 컴포넌트 구조 트리</h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Google AI Studio Build 환경에서 생성된 컴포넌트 분할 구조입니다.
          각 모듈은 명확한 심리학적 목적과 책임을 독립적으로 수행합니다.
        </p>

        {/* Tree List */}
        <div className="space-y-2.5 mb-6">
          {components.map((c, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-violet-50/40 hover:border-violet-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-violet-600 bg-violet-100/70 px-1.5 py-0.5 rounded">
                    &lt;{c.name} /&gt;
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-600 leading-snug">{c.role}</p>
              </div>

              <div className="flex flex-wrap gap-1 shrink-0">
                {c.tags.map((t, ti) => (
                  <span
                    key={ti}
                    className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            if (onComplete) onComplete();
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-violet-600 text-white font-bold text-xs shadow-md shadow-violet-200 hover:bg-violet-700 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>구조 검증 완료 (STEP 05 확인)</span>
        </button>
      </div>
    </div>
  );
};
