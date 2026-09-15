import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import { CenterApp } from './components/CenterApp';
import { RightTop20 } from './components/RightTop20';
import { LessonPanel } from './components/LessonPanel';
import { HighlightRing } from './components/HighlightRing';
import { LandingSections } from './components/LandingSections';
import { FiveSecondTestModal } from './components/modals/FiveSecondTestModal';
import { BuildStructureModal } from './components/modals/BuildStructureModal';
import { GitDeployModal } from './components/modals/GitDeployModal';
import { QAChecklistModal } from './components/modals/QAChecklistModal';
import { GarmentDetailModal } from './components/modals/GarmentDetailModal';
import { SavedLooksModal } from './components/modals/SavedLooksModal';
import { ZoomModal } from './components/modals/ZoomModal';
import { OutfitItem, Season, Gender, AgeGroup, ActiveTab } from './types';
import { OUTFIT_DATABASE, detectCurrentSeason } from './data/outfits';
import { LESSONS } from './data/lessons';
import { X, Sparkles } from 'lucide-react';

export default function App() {
  // 1. Core Filter State with Smart Defaults (Default Effect, §2)
  const [season, setSeason] = useState<Season>(() => detectCurrentSeason());
  const [gender, setGender] = useState<Gender>('여성');
  const [age, setAge] = useState<AgeGroup>('20대');

  // 2. Navigation & View State
  const [activeTab, setActiveTab] = useState<ActiveTab>('outfit');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isTenLookView, setIsTenLookView] = useState(false);
  const [loadedSetCount, setLoadedSetCount] = useState(1);

  // 3. Modals State
  const [isFiveSecModalOpen, setIsFiveSecModalOpen] = useState(false);
  const [isBuildStructureModalOpen, setIsBuildStructureModalOpen] = useState(false);
  const [gitDeployModal, setGitDeployModal] = useState<'github' | 'vercel' | null>(null);
  const [isQAModalOpen, setIsQAModalOpen] = useState(false);
  const [isGarmentDetailOpen, setIsGarmentDetailOpen] = useState(false);
  const [isSavedLooksOpen, setIsSavedLooksOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // 4. Saved Outfits (Endowment Effect, persists to localStorage)
  const [savedOutfits, setSavedOutfits] = useState<OutfitItem[]>(() => {
    try {
      const stored = localStorage.getItem('todaypick_saved_outfits');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    // Initial saved look demonstration
    return [OUTFIT_DATABASE[0]];
  });

  useEffect(() => {
    try {
      localStorage.setItem('todaypick_saved_outfits', JSON.stringify(savedOutfits));
    } catch {
      // storage error fallback
    }
  }, [savedOutfits]);

  // 5. Active Outfit Selection
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>(OUTFIT_DATABASE[0].id);

  // Filter matching outfits based on season, gender, age
  const filteredOutfits = useMemo(() => {
    const matches = OUTFIT_DATABASE.filter((o) => {
      const matchSeason = o.season === season;
      const matchGender = o.gender === gender || o.gender === '유니섹스';
      const matchAge = o.age === age;
      return matchSeason && matchGender && matchAge;
    });

    if (matches.length > 0) return matches;

    // Fallback gracefully to season match to ensure continuous 100% render
    const seasonMatches = OUTFIT_DATABASE.filter((o) => o.season === season);
    return seasonMatches.length > 0 ? seasonMatches : OUTFIT_DATABASE;
  }, [season, gender, age]);

  // Sync selected outfit when filters change
  useEffect(() => {
    if (filteredOutfits.length > 0) {
      const currentStillValid = filteredOutfits.some((o) => o.id === selectedOutfitId);
      if (!currentStillValid) {
        setSelectedOutfitId(filteredOutfits[0].id);
      }
    }
  }, [filteredOutfits, selectedOutfitId]);

  const currentOutfit = useMemo(() => {
    return OUTFIT_DATABASE.find((o) => o.id === selectedOutfitId) || filteredOutfits[0] || OUTFIT_DATABASE[0];
  }, [selectedOutfitId, filteredOutfits]);

  // Multi-cut set for "10개 코디 보기"
  const currentSetLooks = useMemo(() => {
    const setId = currentOutfit.setId;
    const matchingSet = OUTFIT_DATABASE.filter((o) => o.setId === setId);
    if (matchingSet.length >= 2) return matchingSet;

    // If set has fewer cuts, complement with same season items to provide 10 items
    const rest = OUTFIT_DATABASE.filter((o) => o.season === currentOutfit.season && o.id !== currentOutfit.id);
    return [currentOutfit, ...rest].slice(0, 10);
  }, [currentOutfit]);

  // 6. Learning Mode State (§6 - §9)
  const [isLearningModeOpen, setIsLearningModeOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => new Set([1]));
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>('target-center-app');
  const [highlightLabel, setHighlightLabel] = useState('가운데 TodayPick 확인');

  // Sub-step for Lesson 02 (3-Click Rule Interactive Onboarding)
  const [threeClickSubStep, setThreeClickSubStep] = useState<1 | 2 | 3>(1);

  // Sync highlight target when step changes
  useEffect(() => {
    const lesson = LESSONS.find((l) => l.step === currentStep);
    if (!lesson) return;

    if (currentStep === 2) {
      // 3-click rule interactive sequence
      if (threeClickSubStep === 1) {
        setActiveHighlightId('target-season');
        setHighlightLabel('STEP 1: 계절 선택');
      } else if (threeClickSubStep === 2) {
        setActiveHighlightId('target-gender');
        setHighlightLabel('STEP 2: 성별/연령 선택');
      } else {
        setActiveHighlightId('target-main-outfit');
        setHighlightLabel('STEP 3: 코디 확인');
      }
    } else {
      setActiveHighlightId(lesson.targetId);
      setHighlightLabel(lesson.title + ' 확인');
    }
  }, [currentStep, threeClickSubStep]);

  // Mark step completed
  const markStepComplete = (stepNum: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(stepNum);
      return next;
    });
  };

  // Step advancement
  const handleNextStep = () => {
    if (currentStep < LESSONS.length) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setThreeClickSubStep(1);
    } else {
      setIsQAModalOpen(true);
    }
  };

  // Action Click Handler for Learning Track interactions
  const handleActionClick = (actionName: string) => {
    if (currentStep === 2) {
      if (threeClickSubStep === 1 && actionName === 'season') {
        setThreeClickSubStep(2);
      } else if (threeClickSubStep === 2 && (actionName === 'gender' || actionName === 'age')) {
        setThreeClickSubStep(3);
      } else if (threeClickSubStep === 3 && actionName === 'main-outfit') {
        markStepComplete(2);
      }
    } else if (currentStep === 3 && actionName === 'save') {
      markStepComplete(3);
    } else if (currentStep === 1 && actionName === 'main-outfit') {
      markStepComplete(1);
    }
  };

  // Check trigger button in lesson panel
  const handleTriggerCheck = () => {
    const lesson = LESSONS.find((l) => l.step === currentStep);
    if (!lesson) return;

    // Trigger corresponding interactive views
    if (currentStep === 1) {
      markStepComplete(1);
      const el = document.getElementById('target-center-app');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (currentStep === 2) {
      // 3-click rule
      const el = document.getElementById('target-season');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (currentStep === 3) {
      const el = document.getElementById('target-save');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      markStepComplete(3);
    } else if (currentStep === 4) {
      const el = document.getElementById('landing-proof');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      markStepComplete(4);
    } else if (currentStep === 5) {
      setIsBuildStructureModalOpen(true);
    } else if (currentStep === 6) {
      setGitDeployModal('github');
    } else if (currentStep === 7) {
      setGitDeployModal('vercel');
    } else if (currentStep === 8) {
      setIsMobilePreview((prev) => !prev);
      markStepComplete(8);
    } else if (currentStep === 9) {
      setIsFiveSecModalOpen(true);
    } else if (currentStep === 10) {
      setIsQAModalOpen(true);
    }
  };

  // Toggle Save
  const handleToggleSave = () => {
    setSavedOutfits((prev) => {
      const exists = prev.some((o) => o.id === currentOutfit.id);
      if (exists) {
        return prev.filter((o) => o.id !== currentOutfit.id);
      } else {
        return [currentOutfit, ...prev];
      }
    });
  };

  const isCurrentSaved = savedOutfits.some((o) => o.id === currentOutfit.id);

  // Load more sets handler (§11)
  const handleLoadMore = () => {
    setLoadedSetCount((prev) => prev + 1);
    // Switch to another season/set gracefully
    const otherOutfits = OUTFIT_DATABASE.filter((o) => o.id !== currentOutfit.id);
    if (otherOutfits.length > 0) {
      setSelectedOutfitId(otherOutfits[Math.floor(Math.random() * otherOutfits.length)].id);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9fe] text-[#1e1b2e] flex flex-col antialiased selection:bg-violet-200">
      {/* 1. Header (Sticky Top Bar, Real-time Greeting, QA Toggle) */}
      <Header
        isMobilePreview={isMobilePreview}
        onToggleMobilePreview={() => setIsMobilePreview(!isMobilePreview)}
        learningStep={currentStep}
        totalLessons={LESSONS.length}
        completedStepsCount={completedSteps.size}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onToggleLearningMode={() => setIsLearningModeOpen(!isLearningModeOpen)}
        isLearningModeOpen={isLearningModeOpen}
      />

      {/* Circle-Highlight System Anchor (DOM-Ref Based, Single Pulse) */}
      <HighlightRing
        targetId={isLearningModeOpen ? activeHighlightId : null}
        label={highlightLabel}
        isActive={isLearningModeOpen && !!activeHighlightId}
      />

      {/* Main App Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5">
        {/* If Mobile Preview Frame is Active (Lesson 08 QA) */}
        {isMobilePreview ? (
          <div className="flex flex-col items-center justify-center my-4 animate-in zoom-in-95">
            <div className="text-center mb-3">
              <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold">
                📱 모바일 QA 디바이스 프레임 (390px 뷰포트 시뮬레이션)
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                가로 스크롤 없음, 44px 이상 터치 영역, 단일 컬럼 재배치 검증
              </p>
            </div>

            <div className="w-[390px] h-[820px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
              {/* iPhone Notch */}
              <div className="w-36 h-5 bg-black rounded-full mx-auto mb-2 shrink-0" />

              {/* Screen Content Scrollable */}
              <div className="flex-1 bg-[#faf9fe] rounded-[38px] overflow-y-auto custom-scrollbar p-3 space-y-4">
                <CenterApp
                  currentOutfit={currentOutfit}
                  season={season}
                  setSeason={setSeason}
                  gender={gender}
                  setGender={setGender}
                  age={age}
                  setAge={setAge}
                  isSaved={isCurrentSaved}
                  onToggleSave={handleToggleSave}
                  onOpenZoom={() => setIsZoomOpen(true)}
                  onOpenDetail={() => setIsGarmentDetailOpen(true)}
                  onShare={() => navigator.clipboard?.writeText(window.location.href)}
                  isTenLookView={isTenLookView}
                  onToggleTenLookView={() => setIsTenLookView(!isTenLookView)}
                  tenLookSet={currentSetLooks}
                  onSelectCut={(cut) => setSelectedOutfitId(cut.id)}
                  onLoadMore={handleLoadMore}
                  hasMoreSets={true}
                  onActionClick={handleActionClick}
                />

                <RightTop20
                  currentOutfitId={currentOutfit.id}
                  onSelectOutfit={(outfit) => {
                    setSelectedOutfitId(outfit.id);
                    setSeason(outfit.season);
                  }}
                />

                <LandingSections
                  onScrollToTop={handleScrollToTop}
                  onVisitorCountClick={() => {
                    setCurrentStep(4);
                    markStepComplete(4);
                  }}
                />
              </div>

              {/* iPhone Home Bar */}
              <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto mt-2 shrink-0" />
            </div>
          </div>
        ) : (
          /* Desktop 3-Column Layout (§4: Left 18-20%, Center 50-55%, Right 25-30%) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Column 1: Left Navigation (18-20% = 2.5 to 3 cols on 12-col grid) */}
            <div className="hidden lg:block lg:col-span-3 sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar pr-1">
              <LeftNavigation
                activeTab={activeTab}
                onSelectTab={(tab) => {
                  setActiveTab(tab);
                  if (tab === 'top20') {
                    const el = document.getElementById('target-top20');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (tab === 'saved') {
                    setIsSavedLooksOpen(true);
                  }
                }}
                savedCount={savedOutfits.length}
                currentStep={currentStep}
                onSelectStep={(step) => {
                  setCurrentStep(step);
                  setIsLearningModeOpen(true);
                }}
                completedSteps={completedSteps}
              />
            </div>

            {/* Column 2: Center App (50-55% = 6 cols on 12-col grid, Visually Dominant) */}
            <div className="lg:col-span-6 w-full space-y-4">
              <CenterApp
                currentOutfit={currentOutfit}
                season={season}
                setSeason={setSeason}
                gender={gender}
                setGender={setGender}
                age={age}
                setAge={setAge}
                isSaved={isCurrentSaved}
                onToggleSave={handleToggleSave}
                onOpenZoom={() => setIsZoomOpen(true)}
                onOpenDetail={() => setIsGarmentDetailOpen(true)}
                onShare={() => navigator.clipboard?.writeText(window.location.href)}
                isTenLookView={isTenLookView}
                onToggleTenLookView={() => setIsTenLookView(!isTenLookView)}
                tenLookSet={currentSetLooks}
                onSelectCut={(cut) => setSelectedOutfitId(cut.id)}
                onLoadMore={handleLoadMore}
                hasMoreSets={true}
                onActionClick={handleActionClick}
              />

              {/* Landing Funnel Sections Below Fold (AIDA Flow) */}
              <LandingSections
                onScrollToTop={handleScrollToTop}
                onVisitorCountClick={() => {
                  setCurrentStep(4);
                  markStepComplete(4);
                }}
              />
            </div>

            {/* Column 3: Right TOP 20 Panel (25-30% = 3 cols on 12-col grid) */}
            <div className="hidden lg:block lg:col-span-3 sticky top-20 max-h-[calc(100vh-100px)]">
              <RightTop20
                currentOutfitId={currentOutfit.id}
                onSelectOutfit={(outfit) => {
                  setSelectedOutfitId(outfit.id);
                  setSeason(outfit.season);
                  const el = document.getElementById('target-center-app');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>

            {/* Mobile View Stack: Show TOP20 below center on small screens */}
            <div className="lg:hidden w-full mt-4">
              <RightTop20
                currentOutfitId={currentOutfit.id}
                onSelectOutfit={(outfit) => {
                  setSelectedOutfitId(outfit.id);
                  setSeason(outfit.season);
                  const el = document.getElementById('target-center-app');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Floating Lesson Panel (Desktop / Tablet bottom-right or Mobile bottom sheet) */}
      {isLearningModeOpen && (
        <div className="fixed bottom-4 right-4 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-in slide-in-from-bottom-4">
          <LessonPanel
            currentStep={currentStep}
            onSelectStep={(step) => setCurrentStep(step)}
            isConfirmed={completedSteps.has(currentStep)}
            onTriggerCheck={handleTriggerCheck}
            onNextStep={handleNextStep}
            onClose={() => setIsLearningModeOpen(false)}
            onResetProgress={() => {
              setCompletedSteps(new Set([1]));
              setCurrentStep(1);
            }}
          />
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-72 bg-white h-full p-4 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900">TodayPick 메뉴</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <LeftNavigation
                activeTab={activeTab}
                onSelectTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                  if (tab === 'saved') setIsSavedLooksOpen(true);
                }}
                savedCount={savedOutfits.length}
                currentStep={currentStep}
                onSelectStep={(step) => {
                  setCurrentStep(step);
                  setIsLearningModeOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                completedSteps={completedSteps}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <FiveSecondTestModal
        isOpen={isFiveSecModalOpen}
        onClose={() => setIsFiveSecModalOpen(false)}
        onComplete={() => markStepComplete(9)}
      />

      <BuildStructureModal
        isOpen={isBuildStructureModalOpen}
        onClose={() => setIsBuildStructureModalOpen(false)}
        onComplete={() => markStepComplete(5)}
      />

      <GitDeployModal
        isOpen={gitDeployModal !== null}
        mode={gitDeployModal || 'github'}
        onClose={() => setGitDeployModal(null)}
        onComplete={() => {
          if (gitDeployModal === 'github') markStepComplete(6);
          if (gitDeployModal === 'vercel') markStepComplete(7);
        }}
      />

      <QAChecklistModal
        isOpen={isQAModalOpen}
        onClose={() => setIsQAModalOpen(false)}
        onComplete={() => markStepComplete(10)}
      />

      <GarmentDetailModal
        outfit={currentOutfit}
        isOpen={isGarmentDetailOpen}
        onClose={() => setIsGarmentDetailOpen(false)}
      />

      <SavedLooksModal
        isOpen={isSavedLooksOpen}
        onClose={() => setIsSavedLooksOpen(false)}
        savedOutfits={savedOutfits}
        onRemove={(id) => setSavedOutfits((prev) => prev.filter((o) => o.id !== id))}
        onSelectOutfit={(outfit) => {
          setSelectedOutfitId(outfit.id);
          setSeason(outfit.season);
        }}
      />

      <ZoomModal
        outfit={currentOutfit}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </div>
  );
}
