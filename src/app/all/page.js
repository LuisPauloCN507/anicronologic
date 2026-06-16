import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import AnimeCard from "@/components/AnimeCard";
import { getCurrentSeason } from "@/lib/jikan";

export const dynamic = "force-dynamic";

export default async function AllAnimesPage() {
  const animes = await getCurrentSeason(24);

  return (
    <PageShell>
      <PageHeader
        title="🔥 Lançamentos da Temporada"
        description="Veja o que está passando na TV japonesa agora mesmo."
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {animes.map((anime, index) => (
          <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
        ))}
      </div>
    </PageShell>
  );
}