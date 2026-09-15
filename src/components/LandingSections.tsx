import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Shirt, 
  ArrowUp, 
  Users, 
  Calendar, 
  RefreshCw,
  Utensils,
  Compass,
  Check
} from 'lucide-react';

interface LandingSectionsProps {
  onScrollToTop: () => void;
  onVisitorCountClick?: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({
  onScrollToTop,
  onVisitorCountClick,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'TodayPick은 무료로 이용할 수 있나요?',
      a: '네, TodayPick의 모든 코디 큐레이션 및 룩북 추천 기능은 회원가입이나 결제 없이 100% 무료로 즉시 이용하실 수 있습니다.',
    },
    {
      q: '어떤 연령대와 성별을 지원하나요?',
      a: '10대 청소년 스쿨룩부터 2030 대학생 및 직장인 캐주얼/오피스룩, 4050 이상의 클래식 젠틀 룩까지 모든 연령대와 성별 맞춤 필터를 완벽히 제공합니다.',
    },
    {
      q: '추천 코디는 얼마나 자주 업데이트되나요?',
      a: '실제 기상청 데이터와 현지 기온 변화, 트렌드 분석을 기반으로 주간 및 계절 단위로 검증된 전문 스타일리스트 큐레이션이 지속적으로 업데이트됩니다.',
    },
    {
      q: '오늘뭐먹지, 오늘뭐하지 서비스는 언제 오픈되나요?',
      a: 'TodayPick은 의사결정 피로(Decision Fatigue)를 해결하는 라이프스타일 셀렉터로 확장 중입니다. 현재 코디 피커 안정화 후 순차적으로 공개될 예정입니다.',
    },
  ];

  return (
    <section className="w-full mt-12 space-y-16 text-slate-800">
      {/* 1. Problem Section (§13, Paradox of Choice) */}
      <div id="landing-problem" className="max-w-4xl mx-auto text-center px-4">
        <span className="text-xs font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
          PROBLEM
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3">
          매일 아침 반복되는 작은 고민, 이제 끝내세요
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed">
          현대인은 하루 평균 35,000번의 결정을 내립니다. 아침 옷장 앞에서의 15분 망설임은 하루의 집중력을 미리 소진시킵니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-violet-300 transition-all text-left">
            <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mb-3">
              <Shirt className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">오늘 뭐 입지?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              날씨는 애매하고 옷은 많은데 입을 옷이 없는 아침의 끊임없는 고민
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-violet-300 transition-all text-left opacity-80">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 mb-1">오늘 뭐 먹지?</h3>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">준비중</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              점심시간마다 팀원들과 10분 넘게 배달 앱만 스크롤하는 시간 낭비
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-violet-300 transition-all text-left opacity-80">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 mb-1">오늘 뭐 하지?</h3>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">준비중</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              모처럼의 주말인데 어디서 무엇을 할지 몰라 침대에서 흘려보내는 시간
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-violet-50/80 border border-violet-200/70 text-violet-900 text-xs sm:text-sm font-semibold inline-block">
          ✨ TodayPick은 매일의 선택을 3클릭 안으로 가장 단순하고 스마트하게 만듭니다.
        </div>
      </div>

      {/* 2. Solution Section (§13, Mirrors 3-Click Rule) */}
      <div id="landing-solution" className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
            SOLUTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-2">
            가장 직관적인 3단계 코디 여정
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            복잡한 설문이나 불필요한 회원가입 없이 3번의 탭으로 해답을 찾습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">나를 선택</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              계절, 성별, 연령대를 단 1초 만에 탭합니다. 시스템이 현재 계절을 자동 감지해 편의를 높입니다.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">코디 확인</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              추천된 완성형 룩의 핏과 아이템 조합, 기온 안내를 압도적인 고화질 뷰포트에서 확인합니다.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">저장 및 공유</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              원클릭으로 '내 코디'에 담아두거나 지인에게 공유하여 아침 약속 코디를 확정합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Social Proof Section (§3.1, §13, Factual + Educational Visitor Counter) */}
      <div id="landing-proof" className="max-w-4xl mx-auto px-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-[11px] font-bold text-violet-300 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  TRUST & SOCIAL PROOF
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                  검증된 팩트와 열린 지속성
                </h3>
              </div>

              {/* Class-Practice Exception: 누적 방문자 수 (§3.1, §13) */}
              {/* // TODO: replace with real analytics before public launch */}
              <div
                id="target-visitor-count"
                onClick={onVisitorCountClick}
                className="cursor-pointer px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/15 transition-colors flex items-center gap-2"
                title="STEP 04 실습: 밴드웨건 효과 교육용 예시 데이터"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-violet-200">
                    <Users className="w-3 h-3" />
                    <span>누적 방문자 수</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-bold text-[9px]">
                      예시 데이터
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-mono font-black text-white">
                    32,481명
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="text-violet-300 font-bold mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>10대부터 60대까지</span>
                </div>
                <p className="text-slate-300 leading-snug">
                  학생, 직장인, 액티브 시니어까지 전 연령대 체형과 라이프스타일 포용
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="text-violet-300 font-bold mb-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>계절별 스타일 추천</span>
                </div>
                <p className="text-slate-300 leading-snug">
                  봄, 여름, 가을, 겨울의 기온 변화와 일교차를 고려한 실용적 레이어드
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="text-violet-300 font-bold mb-1 flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <span>지속적인 큐레이션 업데이트</span>
                </div>
                <p className="text-slate-300 leading-snug">
                  매 시즌 최신 트렌드를 반영한 고품질 룩북 세트 지속 추가
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FAQ Section (§13, Addressing objections) */}
      <div id="landing-faq" className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
            FAQ
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-slate-900 hover:text-violet-700"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-violet-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Final CTA Section (§13, Gain-Framed Default, Single Main Action) */}
      {/* 
        // Loss-framed A/B test variant candidate (§3.7):
        // "오늘 뭐 입을지 고민하는 시간, TodayPick으로 줄이세요."
      */}
      <div id="landing-cta" className="max-w-4xl mx-auto px-4 pb-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-center shadow-xl shadow-violet-200 relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            오늘의 선택, 지금 TodayPick에서 시작하세요.
          </h3>
          <p className="text-xs sm:text-sm text-violet-100 max-w-md mx-auto mb-6">
            로그인도 결제도 필요 없습니다. 바로 나만의 오늘의 코디를 만나보세요.
          </p>

          <button
            onClick={onScrollToTop}
            className="px-8 py-3.5 rounded-2xl bg-white text-violet-700 font-extrabold text-sm shadow-lg hover:bg-violet-50 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>오늘 코디 보기</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 pt-6 pb-10 text-center text-xs text-slate-400">
        <p className="font-semibold text-slate-600 mb-1">TodayPick — 스마트 패션 큐레이션 &amp; UX 학습 플랫폼</p>
        <p>© 2026 TodayPick. All rights reserved. Designed with behavioral psychology models.</p>
      </footer>
    </section>
  );
};
