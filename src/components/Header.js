"use client";

import { Tv, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault(); // Evita que a página recarregue ao dar Enter
    if (query.trim()) {
      router.push(`/search?q=${query}`); // Redireciona para a página de busca
    }
  };

  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo que também serve como botão para voltar ao Início */}
        <Link href="/" className="flex items-center gap-2 text-indigo-500 hover:text-indigo-400 transition-colors">
          <Tv size={28} />
          <span className="text-xl font-bold tracking-tight text-zinc-50 hidden sm:block">
            Anicronologic
          </span>
        </Link>

        {/* Barra de Pesquisa */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Buscar anime..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-50 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-500 transition-colors"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Navegação */}
        <nav>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
            Início
          </Link>
          <Link href="/explore" className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
            Explorar
          </Link>
        </nav>
        
      </div>
    </header>
  );
}