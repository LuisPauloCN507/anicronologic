import Header from "@/components/Header";
import AnimeCard from "@/components/AnimeCard";

// Esta função vai até a API buscar os animes
async function getTopAnimes() {
  // A Jikan API é pública e não precisa de senhas
  const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=10', {
    next: { revalidate: 3600 } // O Next.js vai salvar isso em cache e atualizar a cada 1 hora
  });
  const data = await res.json();
  return data.data;
}

export default async function Home() {
  // Chamamos a função e guardamos os resultados na variável "animes"
  const animes = await getTopAnimes();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">
            Animes em Destaque
          </h1>
          <p className="text-zinc-400">
            Descubra novos títulos e a ordem cronológica perfeita.
          </p>
        </div>

        {/* Nossa Grid agora renderiza os Cards Reais em vez dos esqueletos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {animes.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </main>
    </div>
  );
}