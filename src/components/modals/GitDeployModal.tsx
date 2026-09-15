import React, { useState } from 'react';
import { X, GitBranch, CloudUpload, ArrowRight, CheckCircle2, Terminal, ExternalLink } from 'lucide-react';

interface GitDeployModalProps {
  isOpen: boolean;
  mode: 'github' | 'vercel';
  onClose: () => void;
  onComplete?: () => void;
}

export const GitDeployModal: React.FC<GitDeployModalProps> = ({
  isOpen,
  mode,
  onClose,
  onComplete,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (!isOpen) return null;

  const githubSteps = [
    {
      title: '1. Repository 생성',
      desc: 'GitHub에 "todaypick-fashion" 신규 원격 레포지토리를 생성합니다.',
      cmd: 'git init\ngit remote add origin https://github.com/user/todaypick.git',
    },
    {
      title: '2. Commit 스냅샷 기록',
      desc: '작업한 심리학 기반 코디 피커 UI 및 컴포넌트 전체를 스테이징 후 커밋합니다.',
      cmd: 'git add .\ngit commit -m "feat: complete TodayPick v2 with psychological design models"',
    },
    {
      title: '3. Push 원격 동기화',
      desc: '원격 메인 브랜치로 푸시하여 클라우드 백업 및 CI/CD 배포 파이프라인을 점화합니다.',
      cmd: 'git push -u origin main',
    },
  ];

  const vercelSteps = [
    {
      title: '1. GitHub 저장소 연동',
      desc: 'Vercel 대시보드에서 방금 Push한 GitHub Repository를 원클릭 Import합니다.',
      cmd: 'Connect: github.com/user/todaypick',
    },
    {
      title: '2. Vite 프레임워크 자동 감지',
      desc: 'Build Command: `vite build`, Output Directory: `dist`가 자동 설정됩니다.',
      cmd: 'Framework Preset: Vite (Zero Configuration)',
    },
    {
      title: '3. 전세계 초고속 엣지 배포',
      desc: '약 20초 만에 글로벌 CDN을 통해 라이브 서비스 URL이 생성됩니다.',
      cmd: 'Status: Ready (200 OK)\nURL: https://todaypick.vercel.app',
    },
  ];

  const steps = mode === 'github' ? githubSteps : vercelSteps;

  const handleStepClick = (idx: number) => {
    setActiveStepIndex(idx);
    if (idx === steps.length - 1 && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div
        id={mode === 'github' ? 'target-github' : 'target-vercel'}
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-violet-100 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            mode === 'github' ? 'bg-slate-900 text-white' : 'bg-black text-white'
          }`}>
            {mode === 'github' ? <GitBranch className="w-5 h-5" /> : <CloudUpload className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-[11px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md">
              {mode === 'github' ? 'STEP 06 · 버전 관리' : 'STEP 07 · 클라우드 배포'}
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              {mode === 'github' ? 'GitHub 소스 저장 파이프라인' : 'Vercel 원클릭 실시간 배포'}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          {mode === 'github'
            ? 'GitHub는 웹사이트의 소스 코드 변경 이력을 타임라인으로 보존하고 협업을 가능케 합니다.'
            : 'Vercel은 GitHub 코드를 실시간 감지하여 누구나 접속 가능한 실제 HTTPS 웹 URL로 배포합니다.'}
        </p>

        {/* 3 Step Interactive Pipeline */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleStepClick(idx)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                activeStepIndex === idx
                  ? 'bg-violet-50/90 border-violet-500 text-violet-900 ring-2 ring-violet-300/40'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="text-[10px] font-bold opacity-60 mb-0.5">STEP 0{idx + 1}</div>
              <div className="text-xs font-bold truncate">{s.title.split('. ')[1]}</div>
            </button>
          ))}
        </div>

        {/* Step Detail Card */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 mb-5 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>{steps[activeStepIndex].title}</span>
            </div>
            <span className="text-[10px] text-emerald-400">Simulation active</span>
          </div>
          <p className="font-sans text-slate-300 text-xs mb-3 leading-relaxed">
            {steps[activeStepIndex].desc}
          </p>
          <pre className="p-2.5 rounded-lg bg-black/50 text-emerald-300 text-[11px] overflow-x-auto">
            {steps[activeStepIndex].cmd}
          </pre>
        </div>

        <button
          onClick={() => {
            if (onComplete) onComplete();
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{mode === 'github' ? 'GitHub 저장 실습 완료' : 'Vercel 배포 실습 완료'}</span>
        </button>
      </div>
    </div>
  );
};
