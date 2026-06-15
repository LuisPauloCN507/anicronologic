"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function FavoriteButton({ anime }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // O setTimeout joga a execução para o próximo milissegundo.
    // Isso resolve o aviso do ESLint (pois deixa de ser síncrono) 
    // e protege o Next.js contra erros de renderização no servidor.
    const timer = setTimeout(() => {
      const favorites = JSON.parse(localStorage.getItem("anicronologic_favorites") || "[]");
      const isFav = favorites.some((fav) => fav.mal_id === anime.mal_id);
      setIsFavorite(isFav);
    }, 0);
    
    return () => clearTimeout(timer); // Limpeza de segurança
  }, [anime.mal_id]);

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    
    let favorites = JSON.parse(localStorage.getItem("anicronologic_favorites") || "[]");
    
    if (isFavorite) {
      // Se já é favorito, remove da lista
      favorites = favorites.filter((fav) => fav.mal_id !== anime.mal_id);
    } else {
      // Se não é, adiciona as informações básicas para montarmos o card depois
      favorites.push({
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images,
        score: anime.score,
        year: anime.year,
        episodes: anime.episodes
      });
    }
    
    localStorage.setItem("anicronologic_favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button 
      onClick={toggleFavorite}
      className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-md p-1.5 rounded-full text-zinc-50 hover:bg-zinc-900 transition-colors z-10"
      title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
    >
      <Heart 
        size={18} 
        className={isFavorite ? "fill-red-500 text-red-500" : "text-zinc-50"} 
      />
    </button>
  );
}