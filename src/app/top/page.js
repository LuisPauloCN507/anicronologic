import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import AnimeCard from "@/components/AnimeCard";
import { getTopAnimes } from "@/lib/jikan";

export const dynamic = "force-dynamic";

export default async function TopAnimesPage() {
  const animes = await getTopAnimes(24);

  return (
    <PageShell>
      <PageHeader
        title="🏆 Os Melhores Animes"
        description="Os animes mais bem avaliados de todos os tempos pela comunidade."
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {animes.map((anime, index) => (
          <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
        ))}
      </div>
    </PageShell>
  );
}