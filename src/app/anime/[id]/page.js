import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, PlayCircle, BookOpen } from "lucide-react";

// Busca os detalhes completos de um anime específico pelo ID
async function getAnimeDetails(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const data = await res.json();
  return data.data;
}

export default async function AnimeDetails({ params }) {
  // Lendo o ID da URL
  const resolvedParams = await params;
  const anime = await getAnimeDetails(resolvedParams.id);

  if (!anime) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        
        {/* Bloco Superior: Imagem e Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Pôster */}
          <div className="w-full md:w-72 shrink-0 relative aspect-3/4 rounded-xl overflow-hidden border border-zinc-800">
            <Image 
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Informações Principais e Sinopse */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-zinc-50 mb-2">{anime.title}</h1>
            {anime.title_english && <h2 className="text-xl text-zinc-400 mb-6">{anime.title_english}</h2>}

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-zinc-50">
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{anime.score || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-zinc-50">
                <Calendar size={18} className="text-indigo-500" />
                <span>{anime.year || "Lançamento"}</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-zinc-50">
                <PlayCircle size={18} className="text-indigo-500" />
                <span>{anime.episodes ? `${anime.episodes} episódios` : "Em lançamento"}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-zinc-50 mb-2">Sinopse</h3>
            <p className="text-zinc-400 leading-relaxed text-justify">
              {anime.synopsis || "Sinopse não disponível."}
            </p>
          </div>
        </div>

        {/* Bloco de Ordem Cronológica e Relações */}
        {anime.relations && anime.relations.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-zinc-50 mb-6">Ordem Cronológica e Relações</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {anime.relations.map((relation, index) => (
                <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
                  <h4 className="text-indigo-500 font-bold mb-3 border-b border-zinc-800 pb-2">
                    {relation.relation}
                  </h4>
                  <ul className="space-y-3 flex-1">
                    {relation.entry.map((entry) => (
                      <li key={entry.mal_id}>
                        {entry.type === "anime" ? (
                          <Link 
                            href={`/anime/${entry.mal_id}`} 
                            className="group flex items-start gap-2 text-zinc-300 hover:text-indigo-400 transition-colors"
                          >
                            <PlayCircle size={16} className="mt-0.5 shrink-0 group-hover:text-indigo-400 text-zinc-500 transition-colors" />
                            <span className="text-sm font-medium leading-snug">{entry.name}</span>
                          </Link>
                        ) : (
                          <div className="flex items-start gap-2 text-zinc-500">
                            <BookOpen size={16} className="mt-0.5 shrink-0" />
                            <span className="text-sm leading-snug">{entry.name} <span className="text-xs opacity-70">({entry.type})</span></span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bloco Inferior: Trailer */}
        {anime.trailer?.embed_url && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-zinc-50 mb-4">Trailer Oficial</h3>
            <div className="aspect-video w-full max-w-3xl rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <iframe 
                src={anime.trailer.embed_url} 
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}