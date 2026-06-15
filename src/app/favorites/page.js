"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AnimeCard from "@/components/AnimeCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Usamos o setTimeout para evitar a atualização síncrona no useEffect,
    // resolvendo o aviso do ESLint e mantendo a performance ideal do React.
    const timer = setTimeout(() => {
      const storedFavorites = JSON.parse(localStorage.getItem("anicronologic_favorites") || "[]");
      setFavorites(storedFavorites);
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer); // Limpeza de segurança
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">
            Minha Lista
          </h1>
          <p className="text-zinc-400">
            {isLoaded && favorites.length > 0 
              ? `Você tem ${favorites.length} anime(s) salvo(s).` 
              : "Guarde os seus animes favoritos para assistir depois."}
          </p>
        </div>

        {/* Mostra um texto de loading enquanto busca os dados */}
        {!isLoaded ? (
          <p className="text-zinc-500">Carregando seus favoritos...</p>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <p className="text-zinc-400 text-lg mb-2">Sua lista está vazia.</p>
            <p className="text-zinc-500 text-sm">Volte ao início e clique no coração para adicionar animes aqui.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}