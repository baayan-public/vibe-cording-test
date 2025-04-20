import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800/50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Infra Tech Hub
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/quiz" className="hover:text-blue-400 transition-colors">
                クイズ一覧
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}