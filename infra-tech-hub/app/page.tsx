import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Infra Tech Hub
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          TCPレベル判定君
        </h2>

        <div className="bg-white/10 p-6 rounded-lg shadow-lg mb-12">
          <p className="text-lg text-center mb-6">
            ネットワーク・クラウド・セキュリティなど複数分野の実践スキルを測定・理解・向上できるモジュール型クイズプラットフォーム
          </p>
          <div className="flex justify-center">
            <Link
              href="/quiz"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              今すぐ挑戦する
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">レベル体系</h3>
            <ul className="space-y-2">
              <li>Lv.1 SYN - 三者ハンドシェイクと基本用語の理解</li>
              <li>Lv.2 ACK - フロー制御、主要フラグの運用</li>
              <li>Lv.3 ESTABLISHED - 輻輳制御、パケット解析</li>
              <li>Lv.4 FIN/ACK - 高度トラブルシュート、RFC読解</li>
            </ul>
          </div>
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">対象ユーザー</h3>
            <ul className="space-y-2">
              <li>ネットワーク基礎学習者 - 大学生、CCNA受験者</li>
              <li>現役ネットワークエンジニア - 企業の運用保守担当</li>
              <li>DevOps・クラウドエンジニア - AWS/GCP/SRE担当</li>
              <li>採用担当者 - 技術スクリーニングツール</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm opacity-75">
            © 2023 Infra Tech Hub - TCPレベル判定君
          </p>
        </div>
      </div>
    </main>
  );
}