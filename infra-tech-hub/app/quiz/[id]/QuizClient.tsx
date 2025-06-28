"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QuizOption from "@/components/quiz/QuizOption";
import SuccessAnimation from "@/components/quiz/SuccessAnimation";
import ProgressRing from "@/components/quiz/ProgressRing";

interface QuizClientProps {
  quiz: any;
}

export default function QuizClient({ quiz }: QuizClientProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (quiz) {
      setStartTime(new Date());
      
      // プログレスバーのアニメーション
      const targetProgress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
      setTimeout(() => {
        setAnimatedProgress(targetProgress);
      }, 300);
    }
  }, [quiz, currentQuestionIndex]);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isAnswered) return;

    const newAnswers = { ...answers };
    newAnswers[currentQuestion.id] = selectedOption;
    setAnswers(newAnswers);

    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setShowSuccessAnimation(true);
    }
  };

  const handleNext = () => {
    setShowSuccessAnimation(false);
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const endTimeNow = new Date();
      setEndTime(endTimeNow);
      const duration = (endTimeNow.getTime() - (startTime?.getTime() || 0)) / 1000;
      
      const quizResults = JSON.parse(
        localStorage.getItem("quizResults") || "{}"
      );
      quizResults[quiz.id] = {
        score,
        total: quiz.questions.length,
        duration,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("quizResults", JSON.stringify(quizResults));

      router.push(
        `/result?quiz=${quiz.id}&score=${score}&total=${quiz.questions.length}&duration=${duration}`
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl relative">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{quiz.title}</h1>
          <div className="flex space-x-2">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-3 py-1 rounded-full font-medium">
              Lv.{quiz.level} {quiz.levelName}
            </span>
            <span className="bg-slate-700/60 text-slate-300 text-sm px-3 py-1 rounded-full border border-slate-600/50">
              {quiz.topic}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6 mb-4">
          <div className="flex-1">
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${animatedProgress}%` }}
              ></div>
            </div>
          </div>
          <ProgressRing progress={animatedProgress} size={60} strokeWidth={6} />
        </div>
        <div className="text-base text-slate-300 font-medium">
          問題 {currentQuestionIndex + 1} / {quiz.questions.length}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
        <h2 className="text-2xl mb-8 text-slate-100 leading-relaxed">{currentQuestion.text}</h2>

        <div className="space-y-4 mb-10">
          {currentQuestion.options.map((option: any) => (
            <QuizOption
              key={option.id}
              id={option.id}
              text={option.text}
              isSelected={selectedOption === option.id}
              isAnswered={isAnswered}
              isCorrect={isAnswered ? option.id === currentQuestion.correctAnswer : null}
              onClick={handleOptionSelect}
            />
          ))}
        </div>

        {isAnswered && (
          <div className="mb-8 p-6 bg-slate-800/60 border border-slate-700/30 rounded-2xl backdrop-blur-sm">
            <h3 className="font-bold mb-3 text-indigo-400 text-lg">解説:</h3>
            <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Link href="/quiz" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            クイズ一覧に戻る
          </Link>
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedOption
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  : "bg-slate-700/50 cursor-not-allowed text-slate-400 border border-slate-600/30"
              }`}
            >
              回答する
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {currentQuestionIndex < quiz.questions.length - 1
                ? "次の問題"
                : "結果を見る"}
            </button>
          )}
        </div>
      </div>

      <SuccessAnimation 
        isVisible={showSuccessAnimation} 
        onComplete={() => setShowSuccessAnimation(false)} 
      />
    </div>
  );
}