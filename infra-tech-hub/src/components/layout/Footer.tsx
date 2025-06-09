export default function Footer() {
    return (
      <footer className="bg-slate-900/60 backdrop-blur-md border-t border-slate-700/50 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Infra Tech Hub
          </p>
        </div>
      </footer>
    );
  }