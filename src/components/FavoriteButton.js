"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { isFavoriteAnime, readFavorites, toggleFavoriteAnime, writeFavorites } from "@/lib/favorites";

export default function FavoriteButton({ anime }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFavorite(isFavoriteAnime(anime.mal_id, readFavorites()));
    }, 0);

    return () => clearTimeout(timer);
  }, [anime.mal_id]);

  const toggleFavorite = (event) => {
    event.preventDefault();

    const nextFavorites = toggleFavoriteAnime(anime, readFavorites());
    writeFavorites(nextFavorites);
    setIsFavorite(isFavoriteAnime(anime.mal_id, nextFavorites));
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-md p-1.5 rounded-full text-zinc-50 hover:bg-zinc-900 transition-colors z-10"
      title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
    >
      <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : "text-zinc-50"} />
    </button>
  );
}