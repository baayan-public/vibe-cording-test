"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import QuizList from "@/components/quiz/QuizList";

// 実装済みのクイズデータ
const quizzes = [
  {
    id: "syn-handshake",
    title: "TCPの3ウェイハンドシェイク",
    level: 1,
    levelName: "入門",
    questions: 3,
    description: "TCP接続確立の基本プロセスを理解する",
    topic: "ネットワーク基礎",
  },
  {
    id: "tcp-flags",
    title: "TCPフラグの基本",
    level: 1,
    levelName: "入門",
    questions: 2,
    description: "SYN、ACK、FIN、RSTなど主要フラグの役割",
    topic: "ネットワーク基礎",
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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">クイズ一覧</h1>
        <p className="mb-8 text-lg text-slate-300">
          挑戦したいクイズを選択してください。レベルやトピックでフィルタリングできます。
        </p>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-indigo-400 mb-3">レベル</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === "all"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setFilter("1")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === "1"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              Lv.1 入門
            </button>
            <button
              onClick={() => setFilter("2")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === "2"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              Lv.2 初級
            </button>
            <button
              onClick={() => setFilter("3")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === "3"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              Lv.3 中級
            </button>
            <button
              onClick={() => setFilter("4")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === "4"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              Lv.4 上級
            </button>
            <button
              onClick={() => setFilter("5")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === "5"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              Lv.5 スペシャリスト
            </button>
            <button
              onClick={() => setFilter("6")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === "6"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              Lv.6 エキスパート
            </button>
            <button
              onClick={() => setFilter("7")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filter === "7"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              Lv.7 パイオニア
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-semibold text-purple-400 mb-3">トピック</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTopicFilter("all")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                topicFilter === "all"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => setTopicFilter("ネットワーク基礎")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                topicFilter === "ネットワーク基礎"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              ネットワーク基礎
            </button>
            <button
              onClick={() => setTopicFilter("ネットワーク応用")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                topicFilter === "ネットワーク応用"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              ネットワーク応用
            </button>
            <button
              onClick={() => setTopicFilter("トラブルシューティング")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                topicFilter === "トラブルシューティング"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              トラブルシューティング
            </button>
          </div>
        </div>
      </div>

      <div className="transition-all duration-500 ease-in-out">
        {filteredQuizzes.length > 0 ? (
          <div key={`${filter}-${topicFilter}`} className="animate-fade-in">
            <QuizList quizzes={filteredQuizzes} />
          </div>
        ) : (
          <div key={`empty-${filter}-${topicFilter}`} className="text-center p-8 bg-slate-800/30 border border-slate-700/30 rounded-2xl animate-fade-in">
            <p>該当するクイズがありません。フィルタを変更してみてください。</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}