import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import AnimeCard from "@/components/AnimeCard";
import { searchAnimes } from "@/lib/jikan";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams?.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery || "";
  const normalizedQuery = query.trim();
  const animes = await searchAnimes(normalizedQuery);

  return (
    <PageShell>
      <PageHeader
        title="Resultados da busca"
        description={normalizedQuery ? `Resultados para: "${normalizedQuery}"` : "Digite um termo para encontrar animes."}
        withBorder={false}
      />

      {!normalizedQuery ? (
        <p className="text-zinc-500">Use a busca do topo ou escolha um gênero para começar.</p>
      ) : animes.length === 0 ? (
        <p className="text-zinc-500">Nenhum anime encontrado para esta busca.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {animes.map((anime, index) => (
            <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
          ))}
        </div>
      )}
    </PageShell>
  );
}