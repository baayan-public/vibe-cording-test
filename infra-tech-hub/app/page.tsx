import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Infra Tech Hub
        </h1>

        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl shadow-2xl mb-16">
          <p className="text-xl text-center mb-8 text-slate-200 leading-relaxed">
            ネットワーク・クラウド・サーバ等のIT技術を学ぶプラットフォーム
          </p>
          <div className="flex justify-center">
            <Link
              href="/quiz"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              今すぐ挑戦する
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-400">
            © 2025 Infra Tech Hub
          </p>
        </div>
      </div>
    </main>
  );
}