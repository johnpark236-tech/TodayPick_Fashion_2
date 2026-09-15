import React from 'react';

interface LessonPanelProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  isConfirmed: boolean;
  onTriggerCheck: () => void;
  onNextStep: () => void;
  onClose?: () => void;
  onResetProgress?: () => void;
}

export const LessonPanel: React.FC<LessonPanelProps> = () => null;
