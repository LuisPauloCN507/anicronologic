import { Tv } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-500">
          <Tv size={28} />
          <span className="text-xl font-bold tracking-tight text-zinc-50">
            Anicronologic
          </span>
        </div>
        <nav>
          <span className="text-sm font-medium text-zinc-400 hover:text-zinc-50 cursor-pointer transition-colors">
            Explorar
          </span>
        </nav>
      </div>
    </header>
  );
}