"use client";
import { useEffect } from 'react';

type ConfettiProps = {
  isVisible: boolean;
  onComplete?: () => void;
};

export default function Confetti({ isVisible, onComplete }: ConfettiProps) {
  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="text-6xl animate-bounce">🎉</div>
    </div>
  );
}