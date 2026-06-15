import Header from "@/components/Header";
import AnimeCard from "@/components/AnimeCard";

// Função para buscar animes pelo nome que o usuário digitou
async function searchAnimes(query) {
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw=true`); // sfw=true evita conteúdo +18
  const data = await res.json();
  return data.data || []; // Retorna os dados ou uma array vazia se não achar nada
}

export default async function SearchPage({ searchParams }) {
  // No Next.js mais recente, precisamos fazer o 'await' do searchParams
  const params = await searchParams;
  const query = params.q || "";
  
  let animes = [];
  
  if (query) {
    animes = await searchAnimes(query);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">
            Resultados da busca para: <span className="text-indigo-500">&quot;{query}&quot;</span>
          </h1>
          <p className="text-zinc-400">
            {animes.length > 0 
              ? `Encontramos ${animes.length} animes.` 
              : "Nenhum anime encontrado. Tente outro nome."}
          </p>
        </div>

        {/* Reutilizamos o nosso AnimeCard! */}
        {animes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {animes.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}