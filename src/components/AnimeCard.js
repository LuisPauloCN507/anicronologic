import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function AnimeCard({ anime }) {
  return (
    <Link 
      href={`/anime/${anime.mal_id}`} 
      className="group relative bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:border-indigo-500 transition-colors cursor-pointer flex flex-col h-full"
    >
      {/* Imagem de Capa */}
      <div className="relative aspect-3/4 overflow-hidden bg-zinc-800">
        <Image 
          src={anime.images.jpg.large_image_url} 
          alt={anime.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Botão de Favorito no canto superior esquerdo */}
        <FavoriteButton anime={anime} />

        {/* Etiqueta com a Nota do Anime */}
        <div className="absolute top-2 right-2 bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold text-zinc-50 z-10">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          {anime.score ? anime.score : "N/A"}
        </div>
      </div>
      
      {/* Informações de Texto */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-zinc-50 line-clamp-1" title={anime.title}>
          {anime.title}
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          {anime.year || "Clássico"} • {anime.episodes ? `${anime.episodes} eps` : "Lançamento"}
        </p>
      </div>
    </Link>
  );
}