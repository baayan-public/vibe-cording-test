"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import QuizOption from "@/components/quiz/QuizOption";
import SuccessAnimation from "@/components/quiz/SuccessAnimation";
import ProgressRing from "@/components/quiz/ProgressRing";

// 仮のクイズデータと問題
const quizData = {
  "syn-handshake": {
    id: "syn-handshake",
    title: "TCPの3ウェイハンドシェイク",
    level: 1,
    levelName: "入門",
    topic: "ネットワーク基礎",
    questions: [
      {
        id: 1,
        text: "TCPの3ウェイハンドシェイクで最初に送信されるフラグは？",
        options: [
          { id: "a", text: "ACK" },
          { id: "b", text: "SYN" },
          { id: "c", text: "FIN" },
          { id: "d", text: "RST" },
        ],
        correctAnswer: "b",
        explanation:
          "3ウェイハンドシェイクの最初のステップでは、クライアントがSYNフラグを立てたセグメントをサーバーに送信します。",
      },
      {
        id: 2,
        text: "3ウェイハンドシェイクの2番目のステップで、サーバーが送信するフラグの組み合わせは？",
        options: [
          { id: "a", text: "SYNのみ" },
          { id: "b", text: "ACKのみ" },
          { id: "c", text: "SYN+ACK" },
          { id: "d", text: "FIN+ACK" },
        ],
        correctAnswer: "c",
        explanation:
          "2番目のステップでは、サーバーがSYNとACKフラグを組み合わせたセグメントを送信します。SYNは自身の初期シーケンス番号を示し、ACKはクライアントのSYNに対する確認応答です。",
      },
      {
        id: 3,
        text: "3ウェイハンドシェイクの最後のステップでクライアントが送信するフラグは？",
        options: [
          { id: "a", text: "SYN" },
          { id: "b", text: "ACK" },
          { id: "c", text: "FIN" },
          { id: "d", text: "RST" },
        ],
        correctAnswer: "b",
        explanation:
          "最後のステップでは、クライアントがACKフラグを立てたセグメントを送信し、サーバーのSYN+ACKに対する確認応答を行います。",
      },
    ],
  },
  "tcp-flags": {
    id: "tcp-flags",
    title: "TCPフラグの基本",
    level: 1,
    levelName: "入門",
    topic: "ネットワーク基礎",
    questions: [
      {
        id: 1,
        text: "TCPヘッダー内でコネクション確立要求を示すフラグは？",
        options: [
          { id: "a", text: "SYN" },
          { id: "b", text: "ACK" },
          { id: "c", text: "PSH" },
          { id: "d", text: "URG" },
        ],
        correctAnswer: "a",
        explanation: "SYN (Synchronize) フラグは、TCPコネクションの確立要求を示します。",
      },
      {
        id: 2,
        text: "コネクションの終了を開始するためのフラグは？",
        options: [
          { id: "a", text: "RST" },
          { id: "b", text: "FIN" },
          { id: "c", text: "ACK" },
          { id: "d", text: "PSH" },
        ],
        correctAnswer: "b",
        explanation: "FIN (Finish) フラグは、送信側がデータ送信を完了し、コネクションを終了したいことを示します。",
      }
    ]
  }
};

export default function QuizPage() {
  const params = useParams();
  const id = params.id as string;
  
  const router = useRouter();
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
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
    const quiz = quizData[id as keyof typeof quizData];
    if (quiz) {
      setCurrentQuiz(quiz);
      setStartTime(new Date());
      
      // プログレスバーのアニメーション
      const targetProgress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
      setTimeout(() => {
        setAnimatedProgress(targetProgress);
      }, 300);
    }
  }, [id, currentQuestionIndex]);

  if (!currentQuiz) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isAnswered) return; // 既に回答済みの場合は何もしない

    const newAnswers = { ...answers };
    newAnswers[currentQuestion.id] = selectedOption;
    setAnswers(newAnswers);

    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      // 正解時のアニメーションを表示
      setShowSuccessAnimation(true);
    }
  };

  const handleNext = () => {
    // 次の問題に移る前にアニメーションを確実にリセット
    setShowSuccessAnimation(false);
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // 全問終了
      const endTimeNow = new Date();
      setEndTime(endTimeNow);
      const duration = (endTimeNow.getTime() - (startTime?.getTime() || 0)) / 1000;
      
      // localStorage にスコアを保存（実際の実装では、より堅牢な方法を使用）
      const quizResults = JSON.parse(
        localStorage.getItem("quizResults") || "{}"
      );
      quizResults[currentQuiz.id] = {
        score,
        total: currentQuiz.questions.length,
        duration,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("quizResults", JSON.stringify(quizResults));

      // 結果ページに遷移
      router.push(
        `/result?quiz=${currentQuiz.id}&score=${score}&total=${currentQuiz.questions.length}&duration=${duration}`
      );
    }
  };

  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl relative">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{currentQuiz.title}</h1>
          <div className="flex space-x-2">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-3 py-1 rounded-full font-medium">
              Lv.{currentQuiz.level} {currentQuiz.levelName}
            </span>
            <span className="bg-slate-700/60 text-slate-300 text-sm px-3 py-1 rounded-full border border-slate-600/50">
              {currentQuiz.topic}
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
          問題 {currentQuestionIndex + 1} / {currentQuiz.questions.length}
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
              {currentQuestionIndex < currentQuiz.questions.length - 1
                ? "次の問題"
                : "結果を見る"}
            </button>
          )}
        </div>
      </div>

      {/* アニメーション・エフェクト */}
      <SuccessAnimation 
        isVisible={showSuccessAnimation} 
        onComplete={() => setShowSuccessAnimation(false)} 
      />
    </div>
  );
}