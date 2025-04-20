"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import QuizList from "@/components/quiz/QuizList";

// 仮のクイズデータ
const quizzes = [
  {
    id: "syn-handshake",
    title: "TCPの3ウェイハンドシェイク",
    level: 1,
    levelName: "SYN",
    questions: 5,
    description: "TCP接続確立の基本プロセスを理解する",
    topic: "ネットワーク基礎",
  },
  {
    id: "tcp-flags",
    title: "TCPフラグの基本",
    level: 1,
    levelName: "SYN",
    questions: 7,
    description: "SYN、ACK、FIN、RSTなど主要フラグの役割",
    topic: "ネットワーク基礎",
  },
  {
    id: "flow-control",
    title: "フロー制御の仕組み",
    level: 2,
    levelName: "ACK",
    questions: 8,
    description: "ウィンドウサイズと輻輳制御の基礎",
    topic: "ネットワーク応用",
  },
  {
    id: "packet-analysis",
    title: "基本的なパケット解析",
    level: 3,
    levelName: "ESTABLISHED",
    questions: 6,
    description: "Wiresharkを使った基本的なTCPパケット解析",
    topic: "トラブルシューティング",
  },
];

export default function QuizPage() {
  const [filter, setFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);

  useEffect(() => {
    let filtered = quizzes;
    
    // レベルフィルタリング
    if (filter !== "all") {
      const level = parseInt(filter);
      filtered = filtered.filter((quiz) => quiz.level === level);
    }
    
    // トピックフィルタリング
    if (topicFilter !== "all") {
      filtered = filtered.filter((quiz) => quiz.topic === topicFilter);
    }
    
    setFilteredQuizzes(filtered);
  }, [filter, topicFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">クイズ一覧</h1>
        <p className="mb-6">
          挑戦したいクイズを選択してください。レベルやトピックでフィルタリングできます。
        </p>

        <div className="mb-4">
          <h3 className="text-sm text-gray-400 mb-2">レベル</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setFilter("1")}
              className={`px-4 py-2 rounded ${
                filter === "1"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Lv.1 SYN
            </button>
            <button
              onClick={() => setFilter("2")}
              className={`px-4 py-2 rounded ${
                filter === "2"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Lv.2 ACK
            </button>
            <button
              onClick={() => setFilter("3")}
              className={`px-4 py-2 rounded ${
                filter === "3"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Lv.3 ESTABLISHED
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">トピック</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTopicFilter("all")}
              className={`px-4 py-2 rounded ${
                topicFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setTopicFilter("ネットワーク基礎")}
              className={`px-4 py-2 rounded ${
                topicFilter === "ネットワーク基礎"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              ネットワーク基礎
            </button>
            <button
              onClick={() => setTopicFilter("ネットワーク応用")}
              className={`px-4 py-2 rounded ${
                topicFilter === "ネットワーク応用"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              ネットワーク応用
            </button>
            <button
              onClick={() => setTopicFilter("トラブルシューティング")}
              className={`px-4 py-2 rounded ${
                topicFilter === "トラブルシューティング"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              トラブルシューティング
            </button>
          </div>
        </div>
      </div>

      {filteredQuizzes.length > 0 ? (
        <QuizList quizzes={filteredQuizzes} />
      ) : (
        <div className="text-center p-8 bg-white/5 rounded-lg">
          <p>該当するクイズがありません。フィルタを変更してみてください。</p>
        </div>
      )}

      <div className="mt-6">
        <Link href="/" className="text-blue-400 hover:underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}