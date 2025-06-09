"use client";
import { useEffect, useState } from 'react';

type SuccessAnimationProps = {
  isVisible: boolean;
  onComplete?: () => void;
};

export default function SuccessAnimation({ isVisible, onComplete }: SuccessAnimationProps) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setShowCheckmark(false);
      setShowText(false);
      return;
    }

    const checkmarkTimer = setTimeout(() => setShowCheckmark(true), 100);
    const textTimer = setTimeout(() => setShowText(true), 400);
    const fadeOutTimer = setTimeout(() => {
      // フェードアウトを開始
      setShowText(false);
    }, 1000);
    const completeTimer = setTimeout(() => {
      onComplete?.();
      setShowCheckmark(false);
    }, 1300); // フェードアウト後に完了

    return () => {
      clearTimeout(checkmarkTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <div className="relative">
        {showCheckmark && (
          <div className="relative flex items-center justify-center">
            {/* メインサークル */}
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-400 to-green-600 flex items-center justify-center transform scale-0 animate-[scale-in_0.6s_ease-out_forwards] border-4 border-white/40" style={{ boxShadow: '0 0 40px rgba(52, 211, 153, 0.6), 0 0 80px rgba(52, 211, 153, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.3), inset 0 -2px 10px rgba(0, 0, 0, 0.2)' }}>
              <svg
                className="w-14 h-14 text-white drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                  className="animate-[draw_0.8s_ease-out_0.2s_forwards]"
                  style={{
                    strokeDasharray: '20',
                    strokeDashoffset: '20',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                  }}
                />
              </svg>
              
              {/* 内側のハイライト */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            
            {/* リングアニメーション */}
            <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-emerald-400/60 animate-[ring-pulse_0.8s_ease-out_forwards]" style={{ boxShadow: '0 0 20px rgba(52, 211, 153, 0.4)' }} />
            <div className="absolute inset-0 w-36 h-36 -m-4 rounded-full border-3 border-emerald-300/40 animate-[ring-pulse_1s_ease-out_0.2s_forwards]" style={{ boxShadow: '0 0 30px rgba(52, 211, 153, 0.2)' }} />
            <div className="absolute inset-0 w-44 h-44 -m-8 rounded-full border-2 border-emerald-200/20 animate-[ring-pulse_1.2s_ease-out_0.4s_forwards]" style={{ boxShadow: '0 0 40px rgba(52, 211, 153, 0.1)' }} />
            
            {/* 強化されたスパークルエフェクト */}
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full animate-[sparkle_0.8s_ease-out_0.4s_forwards] transform -translate-x-1/2 -translate-y-3" style={{ boxShadow: '0 0 8px rgba(255, 235, 59, 0.8)' }} />
            <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full animate-[sparkle_0.8s_ease-out_0.6s_forwards]" style={{ boxShadow: '0 0 8px rgba(255, 235, 59, 0.8)' }} />
            <div className="absolute bottom-3 left-3 w-2 h-2 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full animate-[sparkle_0.8s_ease-out_0.5s_forwards]" style={{ boxShadow: '0 0 8px rgba(255, 235, 59, 0.8)' }} />
            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-gradient-to-r from-white to-yellow-200 rounded-full animate-[sparkle_0.8s_ease-out_0.7s_forwards] transform translate-x-2" style={{ boxShadow: '0 0 6px rgba(255, 255, 255, 0.9)' }} />
            <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-gradient-to-r from-white to-yellow-200 rounded-full animate-[sparkle_0.8s_ease-out_0.8s_forwards] transform -translate-x-2" style={{ boxShadow: '0 0 6px rgba(255, 255, 255, 0.9)' }} />
            
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              showText ? 'opacity-100' : 'opacity-0'
            }`}>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-500 bg-clip-text text-transparent whitespace-nowrap" style={{ filter: 'drop-shadow(0 2px 8px rgba(52, 211, 153, 0.4)) drop-shadow(0 0 16px rgba(52, 211, 153, 0.2))' }}>
                正解！
              </span>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes scale-in {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(-10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes ring-pulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        
        @keyframes sparkle {
          0%, 50% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }
        
      `}</style>
    </div>
  );
}