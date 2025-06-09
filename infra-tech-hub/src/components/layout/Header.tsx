import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-700/50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Infra Tech Hub
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-indigo-400 transition-colors">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/quiz" className="hover:text-purple-400 transition-colors">
                クイズ一覧
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}