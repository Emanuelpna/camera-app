// verificar uma API de busca de receitas 
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.EXPO_PUBLIC_SEARCH_ENGINE_ID;

export async function searchRecipes(ingredient) {
    try {
        const query = `${ingredient} receitas`;
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        const data = await response.json();

        // Filtra apenas resultados relevantes
        return data.items?.map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet,
            image: item.pagemap?.cse_image?.[0]?.src
        })) || [];
    } catch (error) {
        console.error('Erro ao buscar receitas:', error);
        return [];
    }
}