import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { getGenres } from "@/lib/jikan";

export const dynamic = "force-dynamic";

export default async function GenresPage() {
  const genres = await getGenres();

  return (
    <PageShell>
      <PageHeader
        title="🎭 Explore por Gêneros"
        description="Navegue por todas as categorias e descubra novas obras."
      />

      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <Link
            key={genre.mal_id}
            href={`/search?q=${encodeURIComponent(genre.name)}`}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 font-medium text-zinc-300 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            {genre.name} <span className="ml-1 text-xs text-zinc-500">({genre.count})</span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}