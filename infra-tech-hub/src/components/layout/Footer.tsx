export default function Footer() {
    return (
      <footer className="bg-gray-800/50 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} Infra Tech Hub - TCPレベル判定君
          </p>
        </div>
      </footer>
    );
  }