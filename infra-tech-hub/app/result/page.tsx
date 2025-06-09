"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ScoreAnimation from "@/components/quiz/ScoreAnimation";

export default function QuizResult() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz");
  const score = searchParams.get("score");
  const total = searchParams.get("total");
  const duration = searchParams.get("duration") || "0";
  const [levelName, setLevelName] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    // クイズのタイトルとレベル名を取得（実際の実装ではAPIから取得）
    if (quizId === "syn-handshake") {
      setQuizTitle("TCPの3ウェイハンドシェイク");
      setLevelName("SYN");
      setTopic("ネットワーク基礎");
    } else if (quizId === "tcp-flags") {
      setQuizTitle("TCPフラグの基本");
      setLevelName("SYN");
      setTopic("ネットワーク基礎");
    } else if (quizId === "flow-control") {
      setQuizTitle("フロー制御の仕組み");
      setLevelName("ACK");
      setTopic("ネットワーク応用");
    } else if (quizId === "packet-analysis") {
      setQuizTitle("基本的なパケット解析");
      setLevelName("ESTABLISHED");
      setTopic("トラブルシューティング");
    }
  }, [quizId]);

  const percentage = score && total ? Math.round((parseInt(score) / parseInt(total)) * 100) : 0;
  
  // 時間の表示
  const durationMinutes = Math.floor(parseInt(duration) / 60);
  const durationSeconds = Math.floor(parseInt(duration) % 60);
  const durationFormatted = `${durationMinutes}分${durationSeconds}秒`;
  
  // スコアに基づくフィードバック
  let feedback = "";
  if (percentage >= 80) {
    feedback = "素晴らしい！このレベルをマスターしました。";
  } else if (percentage >= 60) {
    feedback = "良い成績です。もう少し練習しましょう。";
  } else {
    feedback = "基本概念を復習することをお勧めします。";
  }

  // 次のレコメンド
  let recommendation = "";
  if (levelName === "SYN" && percentage >= 70) {
    recommendation = "次はレベル2「ACK」のクイズに挑戦してみましょう！";
  } else if (levelName === "ACK" && percentage >= 70) {
    recommendation = "次はレベル3「ESTABLISHED」のクイズに挑戦してみましょう！";
  } else if (levelName === "ESTABLISHED" && percentage >= 70) {
    recommendation = "次はレベル4「FIN/ACK」のクイズで上級スキルを身につけましょう！";
  } else {
    recommendation = "同じレベルのクイズを再度挑戦して、スキルを強化しましょう。";
  }

  // 時間に基づくフィードバック
  let timeComment = "";
  const averageTimePerQuestion = parseInt(duration) / parseInt(total || "1");
  if (averageTimePerQuestion < 10) {
    timeComment = "回答が非常に速いです！知識が定着していますね。";
  } else if (averageTimePerQuestion < 20) {
    timeComment = "適切なペースで回答できています。";
  } else {
    timeComment = "じっくり考えながら回答したようですね。繰り返し練習で速度アップを目指しましょう。";
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 relative">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">クイズ結果</h1>

        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-10 mb-12 shadow-2xl">
          <h2 className="text-2xl mb-4 text-center font-bold text-slate-100">{quizTitle}</h2>
          <div className="flex justify-center space-x-2 mb-8">
            <span className="text-center text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium">
              レベル: {levelName}
            </span>
            <span className="text-center text-sm bg-slate-700/60 text-slate-300 px-4 py-2 rounded-full border border-slate-600/50">
              {topic}
            </span>
          </div>

          <div className="flex flex-col items-center mb-10">
            <ScoreAnimation 
              score={parseInt(score || "0")} 
              total={parseInt(total || "1")}
              onComplete={() => {}}
            />
            <div className="mt-6 text-lg">
              <span className="text-slate-300 font-medium">所要時間: {durationFormatted}</span>
            </div>
          </div>

          <div className="bg-indigo-500/20 border border-indigo-400/30 p-6 rounded-2xl mb-8 backdrop-blur-sm">
            <h3 className="font-bold mb-3 text-indigo-400 text-lg">
              フィードバック:
            </h3>
            <p className="text-slate-300 leading-relaxed mb-3">{feedback}</p>
            <p className="text-slate-300 leading-relaxed">{timeComment}</p>
          </div>

          <div className="bg-green-500/20 border border-green-400/30 p-6 rounded-2xl mb-10 backdrop-blur-sm">
            <h3 className="font-bold mb-3 text-green-400 text-lg">
              次のステップ:
            </h3>
            <p className="text-slate-300 leading-relaxed">{recommendation}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={`/quiz/${quizId}`}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              もう一度挑戦
            </Link>
            <Link
              href="/quiz"
              className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 font-bold py-4 px-8 rounded-full text-center transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              別のクイズを選ぶ
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}