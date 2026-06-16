"use client";

import { useState, useEffect } from "react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import AnimeCard from "@/components/AnimeCard";
import { readFavorites } from "@/lib/favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFavorites(readFavorites());
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const description = isLoaded
    ? favorites.length > 0
      ? `Você tem ${favorites.length} anime(s) salvo(s).`
      : "Guarde os seus animes favoritos para assistir depois."
    : "Carregando seus favoritos...";

  return (
    <PageShell>
      <PageHeader title="Minha Lista" description={description} withBorder={false} />

      {!isLoaded ? (
        <p className="text-zinc-500">Carregando seus favoritos...</p>
      ) : favorites.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-20 text-center">
          <p className="mb-2 text-lg text-zinc-400">Sua lista está vazia.</p>
          <p className="text-sm text-zinc-500">Volte ao início e clique no coração para adicionar animes aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </PageShell>
  );
}