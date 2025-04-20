"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import QuizOption from "@/components/quiz/QuizOption";

// 仮のクイズデータと問題
const quizData = {
  "syn-handshake": {
    id: "syn-handshake",
    title: "TCPの3ウェイハンドシェイク",
    level: 1,
    levelName: "SYN",
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
    levelName: "SYN",
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

  useEffect(() => {
    const quiz = quizData[id as keyof typeof quizData];
    if (quiz) {
      setCurrentQuiz(quiz);
      setStartTime(new Date());
    }
  }, [id]);

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
    if (!selectedOption) return;

    const newAnswers = { ...answers };
    newAnswers[currentQuestion.id] = selectedOption;
    setAnswers(newAnswers);

    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
          <div className="flex space-x-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Lv.{currentQuiz.level} {currentQuiz.levelName}
            </span>
            <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
              {currentQuiz.topic}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-300">
          問題 {currentQuestionIndex + 1} / {currentQuiz.questions.length}
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-6 mb-8">
        <h2 className="text-xl mb-6">{currentQuestion.text}</h2>

        <div className="space-y-3 mb-8">
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
          <div className="mb-6 p-4 bg-gray-700/50 rounded">
            <h3 className="font-bold mb-2">解説:</h3>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Link href="/quiz" className="text-blue-400 hover:underline">
            クイズ一覧に戻る
          </Link>
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`px-6 py-2 rounded-full ${
                selectedOption
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-800/50 cursor-not-allowed"
              }`}
            >
              回答する
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full"
            >
              {currentQuestionIndex < currentQuiz.questions.length - 1
                ? "次の問題"
                : "結果を見る"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}