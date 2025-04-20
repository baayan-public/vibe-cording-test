"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">クイズ結果</h1>

        <div className="bg-white/5 rounded-lg p-8 mb-8">
          <h2 className="text-xl mb-2 text-center">{quizTitle}</h2>
          <div className="flex justify-center space-x-2 mb-8">
            <span className="text-center text-sm bg-blue-600 px-2 py-1 rounded">
              レベル: {levelName}
            </span>
            <span className="text-center text-sm bg-gray-700 px-2 py-1 rounded">
              {topic}
            </span>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative w-36 h-36 mb-4">
              <div className="w-full h-full rounded-full bg-gray-700"></div>
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-blue-500"
                style={{
                  transform: `rotate(${percentage * 3.6}deg)`,
                  transition: "transform 1s ease-out",
                }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold">{percentage}%</span>
              </div>
            </div>
            <p className="text-xl font-semibold">
              {score} / {total} 正解
            </p>
            <p className="text-sm text-gray-300 mt-2">
              所要時間: {durationFormatted}
            </p>
          </div>

          <div className="bg-blue-900/30 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">フィードバック:</h3>
            <p>{feedback}</p>
            <p className="mt-2">{timeComment}</p>
          </div>

          <div className="bg-green-900/30 p-4 rounded-lg mb-8">
            <h3 className="font-bold mb-2">次のステップ:</h3>
            <p>{recommendation}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/quiz/${quizId}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-center transition-colors"
            >
              もう一度挑戦
            </Link>
            <Link
              href="/quiz"
              className="bg-white/10 hover:bg-white/20 font-bold py-2 px-6 rounded-full text-center transition-colors"
            >
              別のクイズを選ぶ
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-blue-400 hover:underline">
            ホームに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}