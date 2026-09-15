import React, { useEffect, useState } from 'react';

interface HighlightRingProps {
  targetId: string | null;
  label?: string;
  isActive: boolean;
}

export const HighlightRing: React.FC<HighlightRingProps> = ({ targetId, label = '여기를 확인해보세요', isActive }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!targetId || !isActive) {
      setRect(null);
      return;
    }

    const updatePosition = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const r = el.getBoundingClientRect();
        // Check if element has non-zero size and is in view or rendered
        if (r.width > 0 && r.height > 0) {
          setRect(r);
        }
      } else {
        setRect(null);
      }
    };

    updatePosition();

    // Re-check shortly after layout settle or animations
    const timer1 = setTimeout(updatePosition, 100);
    const timer2 = setTimeout(updatePosition, 400);

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    const observer = new ResizeObserver(updatePosition);
    const el = document.getElementById(targetId);
    if (el) {
      observer.observe(el);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      observer.disconnect();
    };
  }, [targetId, isActive]);

  if (!rect || !isActive) return null;

  // Compute padded coords relative to window viewport
  const padding = 6;
  const top = rect.top - padding;
  const left = rect.left - padding;
  const width = rect.width + padding * 2;
  const height = rect.height + padding * 2;
  const isCircular = Math.abs(rect.width - rect.height) < 14 && rect.width < 100;
  const borderRadius = isCircular ? '9999px' : '16px';

  return (
    <div
      style={{
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: borderRadius,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="animate-soft-ring border-2 border-violet-500/90 shadow-[0_0_20px_rgba(139,92,246,0.35)]"
    >
      {/* Floating Micro-Label */}
      <div
        className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-violet-700 text-white text-[11px] font-medium tracking-tight shadow-md flex items-center gap-1.5 whitespace-nowrap animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
        <span>{label}</span>
      </div>
    </div>
  );
};
