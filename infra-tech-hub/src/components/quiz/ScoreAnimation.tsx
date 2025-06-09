"use client";
import { useEffect, useState } from 'react';

type ScoreAnimationProps = {
  score: number;
  total: number;
  onComplete?: () => void;
};

export default function ScoreAnimation({ score, total, onComplete }: ScoreAnimationProps) {
  const [currentScore, setCurrentScore] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const percentage = Math.round((score / total) * 100);
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;

  useEffect(() => {
    const duration = 2500; // 2.5秒間に短縮
    const frameDuration = 16; // 60fps相当のスムーズなアニメーション
    const totalFrames = duration / frameDuration;
    let currentFrame = 0;

    // easeOutQuartイージング関数で最初は速く、後半はゆっくり
    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const timer = setInterval(() => {
      currentFrame++;
      const rawProgress = currentFrame / totalFrames;
      const easedProgress = easeOutQuart(rawProgress);
      
      const animatedScore = easedProgress * score;
      const animatedPercentage = easedProgress * percentage;
      
      setCurrentScore(Math.floor(animatedScore));
      setCurrentPercentage(Math.floor(animatedPercentage));

      if (currentFrame >= totalFrames) {
        clearInterval(timer);
        setCurrentScore(score);
        setCurrentPercentage(percentage);
        
        if (percentage === 100) {
          // 100%の場合のみお祝いアニメーションを表示
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 2000);
        }
        
        if (isExcellent) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 1500);
        }
        
        setTimeout(() => onComplete?.(), 800);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [score, percentage, isExcellent, onComplete]);

  return (
    <div className="relative flex flex-col items-center">
      {/* メインスコア表示 */}
      <div className="relative mb-6">
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <div className={`text-6xl font-bold transition-all duration-300 ${
            currentPercentage >= 80 ? 'text-green-400' : 
            currentPercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {currentScore}
          </div>
          <div className="text-3xl text-slate-400">
            / {total}
          </div>
        </div>
        
        {/* パーセンテージ */}
        <div className={`text-2xl font-bold text-center transition-all duration-300 ${
          currentPercentage >= 80 ? 'text-green-400' : 
          currentPercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {currentPercentage}%
        </div>
      </div>



      {/* レベルアップバッジ */}
      {currentPercentage >= 90 && (
        <div 
          className="mt-6 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full text-white font-bold shadow-2xl opacity-0 border border-emerald-300/30"
          style={{ 
            animation: 'fadeInUp 0.8s ease-out 3s forwards',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          Perfect Score!
        </div>
      )}
      {currentPercentage >= 80 && currentPercentage < 90 && (
        <div 
          className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white font-bold shadow-2xl opacity-0 border border-blue-300/30"
          style={{ 
            animation: 'fadeInUp 0.8s ease-out 3s forwards',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          Excellent!
        </div>
      )}
      {currentPercentage >= 60 && currentPercentage < 80 && (
        <div 
          className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-white font-bold shadow-2xl opacity-0 border border-amber-300/30"
          style={{ 
            animation: 'fadeInUp 0.8s ease-out 3s forwards',
            boxShadow: '0 8px 32px rgba(245, 158, 11, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          Good Job!
        </div>
      )}
      {/* 100%時の光る波紋エフェクト */}
      {showCelebration && percentage === 100 && <GlowRippleEffect />}
    </div>
  );
}

// 光る波紋エフェクトコンポーネント
function GlowRippleEffect() {
  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        style={{ 
          animation: 'gracefulEntrance 0.8s ease-out forwards',
          opacity: 0
        }}
      >
        {/* 背景の光のオーラ */}
        <div 
          className="absolute w-96 h-96 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 80%)',
            animation: 'gentleAura 3s ease-in-out infinite alternate',
            filter: 'blur(20px)'
          }}
        />
        
        {/* メイン波紋エフェクト */}
        <div className="relative">
          <div 
            className="absolute w-20 h-20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0) 70%)',
              animation: 'elegantRipple 3s ease-out infinite 0.5s',
              boxShadow: '0 0 60px rgba(16, 185, 129, 0.6)',
              opacity: 0
            }}
          />
          <div 
            className="absolute w-40 h-40 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(52, 211, 153, 0.6) 0%, rgba(52, 211, 153, 0) 70%)',
              animation: 'elegantRipple 3s ease-out infinite 0.8s',
              boxShadow: '0 0 80px rgba(52, 211, 153, 0.4)',
              opacity: 0
            }}
          />
          <div 
            className="absolute w-60 h-60 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(110, 231, 183, 0.4) 0%, rgba(110, 231, 183, 0) 70%)',
              animation: 'elegantRipple 3s ease-out infinite 1.1s',
              boxShadow: '0 0 100px rgba(110, 231, 183, 0.3)',
              opacity: 0
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(167, 243, 208, 0.2) 0%, rgba(167, 243, 208, 0) 70%)',
              animation: 'elegantRipple 3s ease-out infinite 1.4s',
              boxShadow: '0 0 120px rgba(167, 243, 208, 0.2)',
              opacity: 0
            }}
          />
        </div>
        
        {/* 中央の光るコア */}
        <div 
          className="absolute w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(255, 235, 59, 1) 0%, rgba(255, 193, 7, 0.8) 50%, rgba(255, 235, 59, 0) 100%)',
            animation: 'coreBloom 1s ease-out 0.3s forwards, smoothGlow 2s ease-in-out infinite alternate 1.3s',
            boxShadow: '0 0 40px rgba(255, 235, 59, 0.9), 0 0 80px rgba(255, 235, 59, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3)',
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)'
          }}
        />
        
        {/* 回転するキラキラ */}
        <div 
          className="absolute w-32 h-32 transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            animation: 'sparkleEntrance 1.2s ease-out 0.8s forwards, smoothRotate 6s linear infinite 2s',
            opacity: 0
          }}
        >
          <div className="absolute top-2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2" style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)', animation: 'smoothTwinkle 1.5s ease-in-out infinite 2s' }} />
          <div className="absolute top-1/2 right-2 w-3 h-3 bg-yellow-300 rounded-full transform -translate-y-1/2" style={{ boxShadow: '0 0 10px rgba(255, 235, 59, 0.8)', animation: 'smoothTwinkle 1.8s ease-in-out infinite 2.3s' }} />
          <div className="absolute bottom-2 left-1/2 w-2 h-2 bg-emerald-300 rounded-full transform -translate-x-1/2" style={{ boxShadow: '0 0 8px rgba(110, 231, 183, 0.8)', animation: 'smoothTwinkle 1.6s ease-in-out infinite 2.6s' }} />
          <div className="absolute top-1/2 left-2 w-2.5 h-2.5 bg-white rounded-full transform -translate-y-1/2" style={{ boxShadow: '0 0 9px rgba(255, 255, 255, 0.9)', animation: 'smoothTwinkle 1.7s ease-in-out infinite 2.9s' }} />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gracefulEntrance {
          0% {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes gentleAura {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }
        
        @keyframes elegantRipple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes coreBloom {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes sparkleEntrance {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }
        
        @keyframes smoothGlow {
          0% {
            filter: brightness(1);
          }
          100% {
            filter: brightness(1.3);
          }
        }
        
        @keyframes smoothRotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes smoothTwinkle {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

// CSS keyframes をインラインで追加
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}