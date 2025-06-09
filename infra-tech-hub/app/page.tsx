import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Infra Tech Hub
        </h1>

        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl shadow-2xl mb-16">
          <p className="text-xl text-center mb-8 text-slate-200 leading-relaxed">
            ネットワーク・クラウド・セキュリティなど複数分野の実践スキルを測定・理解・向上できるモジュール型クイズプラットフォーム
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/30 p-8 rounded-2xl hover:border-slate-600/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-indigo-400">レベル体系</h3>
            <ul className="space-y-3 text-base text-slate-300">
              <li>Lv.1 入門 - キーワードを知っている</li>
              <li>Lv.2 初級 - 仕組みを理解</li>
              <li>Lv.3 中級 - 独力で活用</li>
              <li>Lv.4 上級 - 深い実務経験</li>
              <li>Lv.5 スペシャリスト - 設計・改善を主導</li>
              <li>Lv.6 エキスパート - 領域横断で最適化</li>
              <li>Lv.7 パイオニア - 新たな価値を創出</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/30 p-8 rounded-2xl hover:border-slate-600/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">対象ユーザー</h3>
            <ul className="space-y-3 text-base text-slate-300">
              <li>ネットワーク基礎学習者 - 大学生、CCNA受験者</li>
              <li>現役ネットワークエンジニア - 企業の運用保守担当</li>
              <li>DevOps・クラウドエンジニア - AWS/GCP/SRE担当</li>
              <li>採用担当者 - 技術スクリーニングツール</li>
            </ul>
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