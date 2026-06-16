import PageShell from "@/components/PageShell";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, PlayCircle, BookOpen, Layers, ArrowRight } from "lucide-react";
import { getAnimeDetails } from "@/lib/jikan";

export const dynamic = "force-dynamic";

export default async function AnimeDetails({ params }) {
  const resolvedParams = await params;
  const anime = await getAnimeDetails(resolvedParams.id);

  if (!anime) return null;

  return (
    <PageShell>
      {/* Bloco Superior Premium: Pôster com Efeito de Sombra e Detalhes */}
      <div className="mb-16 flex flex-col gap-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm md:flex-row">
        <div className="relative aspect-3/4 w-full shrink-0 overflow-hidden rounded-xl border border-zinc-700/50 shadow-2xl shadow-indigo-500/10 group md:w-72">
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-102"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                {anime.type || "Anime"}
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {anime.status}
              </span>
            </div>

            <h1 className="mb-2 bg-linear-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-4xl font-black tracking-tight text-zinc-50 md:text-5xl">
              {anime.title}
            </h1>
            {anime.title_english ? <h2 className="mb-6 text-lg font-medium text-zinc-400">{anime.title_english}</h2> : null}

            <div className="mb-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-zinc-50">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold">{anime.score || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-zinc-50">
                <Calendar size={16} className="text-indigo-400" />
                <span className="text-sm font-medium">{anime.year || "Clássico"}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-zinc-50">
                <PlayCircle size={16} className="text-indigo-400" />
                <span className="text-sm font-medium">{anime.episodes ? `${anime.episodes} eps` : "Em lançamento"}</span>
              </div>
            </div>

            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-zinc-100">
              <Layers size={18} className="text-indigo-500" /> Sinopse Oficial
            </h3>
            <p className="max-w-4xl text-justify text-sm leading-relaxed text-zinc-400 md:text-base">
              {anime.synopsis || "Sinopse não disponível."}
            </p>
          </div>
        </div>
      </div>

      {anime.relations && anime.relations.length > 0 ? (
        <div className="mb-16">
          <div className="mb-8 border-b border-zinc-800 pb-4">
            <h3 className="text-2xl font-black tracking-tight text-zinc-50 md:text-3xl">
              Linha do Tempo &amp; Ordem de Leitura/Assinatura
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              Entenda a conexão cronológica exata entre as mídias da obra original e suas adaptações.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {anime.relations.map((relation, index) => (
              <div
                key={index}
                className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700/50"
              >
                <div className="mb-4 flex items-center justify-between border-b border-zinc-800/60 pb-3">
                  <span className="text-sm font-extrabold uppercase tracking-wide text-indigo-400">
                    {relation.relation}
                  </span>
                  <span className="text-xs font-medium text-zinc-500">
                    {relation.entry.length} {relation.entry.length === 1 ? "mídia" : "mídias"}
                  </span>
                </div>

                <ul className="flex-1 space-y-3">
                  {relation.entry.map((entry) => {
                    const isAnime = entry.type === "anime";

                    return (
                      <li key={entry.mal_id} className="block">
                        {isAnime ? (
                          <Link
                            href={`/anime/${entry.mal_id}`}
                            className="flex items-center justify-between rounded-xl border border-zinc-800/50 bg-zinc-900/60 p-3 transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/5"
                          >
                            <div className="flex min-w-0 items-start gap-3">
                              <PlayCircle size={18} className="mt-0.5 shrink-0 text-indigo-400" />
                              <div className="min-w-0">
                                <p className="truncate pr-2 text-sm font-semibold text-zinc-200">{entry.name}</p>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400/80">
                                  Assistir
                                </span>
                              </div>
                            </div>
                            <ArrowRight size={14} className="shrink-0 text-zinc-600 transition-colors group-hover:text-indigo-400" />
                          </Link>
                        ) : (
                          <div className="flex items-start gap-3 rounded-xl border border-zinc-800/50 bg-linear-to-br from-zinc-900/80 to-zinc-900/40 p-3">
                            <BookOpen size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                            <div>
                              <p className="text-sm font-semibold text-zinc-300">{entry.name}</p>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/80">
                                Ler ({entry.type === "manga" ? "Mangá" : "Light Novel"})
                              </span>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 border-t border-zinc-800/40 pt-3 text-xs italic text-zinc-500">
                  {relation.relation === "Prequel" && "💡 Assista/Leia este conteúdo antes da temporada atual para entender o passado da história."}
                  {relation.relation === "Sequel" && "🚀 Este conteúdo continua diretamente os eventos da temporada que você está visualizando."}
                  {relation.relation === "Adaptation" && "📖 Esta é a obra original (Mangá/Manga/Novel) que deu origem a esta produção visual."}
                  {!(["Prequel", "Sequel", "Adaptation"].includes(relation.relation)) &&
                    "🔗 Conteúdo complementar ou alternativo que expande o universo da obra."}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {anime.trailer?.embed_url ? (
        <div className="mb-12">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-zinc-100">
            <PlayCircle size={20} className="text-indigo-500" /> Trailer Oficial da Produção
          </h3>
          <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-indigo-500/5">
            <iframe src={anime.trailer.embed_url} className="w-full h-full" allowFullScreen />
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}