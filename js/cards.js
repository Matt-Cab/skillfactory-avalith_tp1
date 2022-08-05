const URL_GET_CHARACTERS = "https://rickandmortyapi.com/api/character";

const fetchCharacters = async (url) => {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const characters = await response.json();
            return characters;
        } else {
            return {};
        }
    }
    catch (error) {
        console.error(error);
        return { error };
    }
}
