import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, PlayCircle, BookOpen, Layers, ArrowRight } from "lucide-react";

async function getAnimeDetails(id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const data = await res.json();
  return data.data;
}

export default async function AnimeDetails({ params }) {
  const resolvedParams = await params;
  const anime = await getAnimeDetails(resolvedParams.id);

  if (!anime) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        
        {/* Bloco Superior Premium: Pôster com Efeito de Sombra e Detalhes */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-sm">
          {/* Pôster com Destaque Neon Suave */}
          <div className="w-full md:w-72 shrink-0 relative aspect-3/4 rounded-xl overflow-hidden border border-zinc-700/50 shadow-2xl shadow-indigo-500/10 group">
            <Image 
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          {/* Informações Principais */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                  {anime.type || "Anime"}
                </span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  {anime.status}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-zinc-50 mb-2 tracking-tight bg-linear-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text">
                {anime.title}
              </h1>
              {anime.title_english && <h2 className="text-lg text-zinc-400 font-medium mb-6">{anime.title_english}</h2>}

              {/* Pílulas de Informações com Estilo Glassmorphism */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl text-zinc-50">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="font-bold text-sm">{anime.score || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl text-zinc-50">
                  <Calendar size={16} className="text-indigo-400" />
                  <span className="text-sm font-medium">{anime.year || "Clássico"}</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl text-zinc-50">
                  <PlayCircle size={16} className="text-indigo-400" />
                  <span className="text-sm font-medium">{anime.episodes ? `${anime.episodes} eps` : "Em lançamento"}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-100 mb-2 flex items-center gap-2">
                <Layers size={18} className="text-indigo-500" /> Sinopse Oficial
              </h3>
              <p className="text-zinc-400 leading-relaxed text-justify text-sm md:text-base max-w-4xl">
                {anime.synopsis || "Sinopse não disponível."}
              </p>
            </div>
          </div>
        </div>

        {/* Guia de Ordem Cronológica Unificada (Anime, Mangá e Light Novel) */}
        {anime.relations && anime.relations.length > 0 && (
          <div className="mb-16">
            <div className="border-b border-zinc-800 pb-4 mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-zinc-50 tracking-tight">
                Linha do Tempo &amp; Ordem de Leitura/Assinatura
              </h3>
              <p className="text-zinc-400 text-sm mt-1">
                Entenda a conexão cronológica exata entre as mídias da obra original e suas adaptações.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {anime.relations.map((relation, index) => (
                <div 
                  key={index} 
                  className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-col hover:border-zinc-700/50 transition-all duration-300 backdrop-blur-sm group"
                >
                  {/* Tipo de Relação com Badge de Destaque */}
                  <div className="flex items-center justify-between mb-4 border-b border-zinc-800/60 pb-3">
                    <span className="text-sm font-extrabold tracking-wide text-indigo-400 uppercase">
                      {relation.relation}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      {relation.entry.length} {relation.entry.length === 1 ? 'mídia' : 'mídias'}
                    </span>
                  </div>

                  {/* Lista de Mídias na Linha do Tempo */}
                  <ul className="space-y-3 flex-1">
                    {relation.entry.map((entry) => {
                      const isAnime = entry.type === "anime";
                      return (
                        <li key={entry.mal_id} className="block">
                          {isAnime ? (
                            <Link 
                              href={`/anime/${entry.mal_id}`} 
                              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/50 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-200"
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <PlayCircle size={18} className="mt-0.5 text-indigo-400 shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-zinc-200 truncate pr-2">{entry.name}</p>
                                  <span className="text-[11px] font-bold tracking-wider text-indigo-400/80 uppercase">Assistir</span>
                                </div>
                              </div>
                              <ArrowRight size={14} className="text-zinc-600 group-hover:text-indigo-400 transition-colors shrink-0" />
                            </Link>
                          ) : (
                            <div className="p-3 rounded-xl bg-linear-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/50 flex items-start gap-3">
                              <BookOpen size={18} className="mt-0.5 text-emerald-400 shrink-0" />
                              <div>
                                <p className="text-sm font-semibold text-zinc-300">{entry.name}</p>
                                <span className="text-[11px] font-bold tracking-wider text-emerald-400/80 uppercase">
                                  Ler ({entry.type === "manga" ? "Mangá" : "Light Novel"})
                                </span>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  
                  {/* Nota Cronológica Explicativa Automática baseada no tipo */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/40 text-xs text-zinc-500 italic">
                    {relation.relation === "Prequel" && "💡 Assista/Leia este conteúdo antes da temporada atual para entender o passado da história."}
                    {relation.relation === "Sequel" && "🚀 Este conteúdo continua diretamente os eventos da temporada que você está visualizando."}
                    {relation.relation === "Adaptation" && "📖 Esta é a obra original (Mangá/Manga/Novel) que deu origem a esta produção visual."}
                    {!(["Prequel", "Sequel", "Adaptation"].includes(relation.relation)) && "🔗 Conteúdo complementar ou alternativo que expande o universo da obra."}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bloco de Vídeo / Trailer com Design de Cinema */}
        {anime.trailer?.embed_url && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <PlayCircle size={20} className="text-indigo-500" /> Trailer Oficial da Produção
            </h3>
            <div className="aspect-video w-full max-w-4xl rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl shadow-indigo-500/5">
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