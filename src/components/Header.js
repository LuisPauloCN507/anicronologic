"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Home, LayoutGrid, LibraryBig, Menu, Search, Trophy, Tv, X } from "lucide-react";

const navigationItems = [
  { href: "/", label: "Início", icon: Home, iconClassName: "text-indigo-400", key: "home" },
  { href: "/favorites", label: "Minha Lista", icon: Heart, iconClassName: "text-red-400", key: "favorites" },
  { href: "/top", label: "Animes em Destaque", icon: Trophy, iconClassName: "text-amber-400", key: "top" },
  { href: "/genres", label: "Tipos & Gêneros", icon: LayoutGrid, iconClassName: "text-emerald-400", key: "genres" },
  { href: "/all", label: "Animes da Temporada", icon: LibraryBig, iconClassName: "text-indigo-400", key: "all" },
];

export default function Header() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    closeMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-2 text-indigo-500 transition-colors hover:text-indigo-400">
            <Tv size={28} />
            <span className="hidden text-xl font-bold tracking-tight text-zinc-50 sm:block">Anicronologic</span>
          </Link>

          <form onSubmit={handleSearch} className="relative ml-auto mr-4 hidden flex-1 max-w-md md:flex">
            <input
              type="text"
              placeholder="Buscar anime..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-2 pl-4 pr-10 text-zinc-50 transition-colors focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-indigo-500"
            >
              <Search size={18} />
            </button>
          </form>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-zinc-400 transition-colors hover:text-indigo-500"
            aria-label="Abrir menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={closeMenu}
            aria-label="Fechar menu"
          />

          <aside className="relative flex h-full w-full max-w-xs flex-col border-l border-zinc-800 bg-[#09090b] shadow-2xl sm:max-w-sm">
            <div className="flex items-center justify-between border-b border-zinc-800 p-5">
              <span className="flex items-center gap-2 text-lg font-bold text-zinc-50">
                <Menu size={20} className="text-indigo-500" />
                Navegação
              </span>
              <button
                onClick={closeMenu}
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-red-400"
                aria-label="Fechar menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5">
              <form onSubmit={handleSearch} className="relative mb-2 md:hidden">
                <input
                  type="text"
                  placeholder="Buscar anime..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-4 pr-10 text-zinc-50 transition-colors focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  <Search size={18} />
                </button>
              </form>

              <nav className="flex flex-col gap-2">
                {navigationItems.map(({ href, label, icon: Icon, iconClassName, key }) => (
                  <Link
                    key={key}
                    href={href}
                    onClick={closeMenu}
                    className="group flex items-center gap-3 rounded-xl p-3 text-zinc-300 transition-all hover:bg-zinc-900/80 hover:text-zinc-50"
                  >
                    <Icon size={20} className={`${iconClassName} transition-transform group-hover:scale-110`} />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border-t border-zinc-800 bg-zinc-900/20 p-5 text-center text-xs text-zinc-500">
              Anicronologic © 2026
              <br />
              <span className="font-medium text-indigo-500/80">Projeto Portfólio</span>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}