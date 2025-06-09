"use client";
import { useEffect, useRef } from 'react';

type SoundEffectsProps = {
  playCorrect: boolean;
  playIncorrect: boolean;
  onSoundComplete?: () => void;
};

export default function SoundEffects({ playCorrect, playIncorrect, onSoundComplete }: SoundEffectsProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Web Audio APIを初期化
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.log('Web Audio API not supported');
      }
    }
  }, []);

  const playBeep = (frequency: number, duration: number, type: 'success' | 'error' = 'success') => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.type = 'sine';

    if (type === 'success') {
      // 正解音：上昇する音階
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.5, context.currentTime + duration / 2);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 2, context.currentTime + duration);
    } else {
      // 不正解音：下降する音
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, context.currentTime + duration);
    }

    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);

    oscillator.onended = () => {
      onSoundComplete?.();
    };
  };

  useEffect(() => {
    if (playCorrect) {
      playBeep(523.25, 0.6, 'success'); // C5音階から始まる上昇音
    }
  }, [playCorrect]);

  useEffect(() => {
    if (playIncorrect) {
      playBeep(349.23, 0.8, 'error'); // F4音階から始まる下降音
    }
  }, [playIncorrect]);

  return null; // このコンポーネントは音だけなので何も描画しない
}