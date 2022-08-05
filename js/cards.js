const URL_GET_CHARACTERS = "https://rickandmortyapi.com/api/character";

const fetchCharacters = async (url) => {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const characters = await response.json();

            return { status: response.status, characters};
        }
        else {
            return { status: response.status };
        }
    }
    catch (error) {
        return { error };
    }
}

const addCharacterToPage = (character, cardsContainer) => {
    const characterCard = document.createElement("div");
    characterCard.classList = "card";

    characterCard.innerHTML = `
        <img class="card--img" src="${character.image}" alt="${character.name}" loading="lazy">
        <h3 class="card--character-name">${character.name}</h3>
        <p class="card--character-info">Status: ${character.status}</p>
        <p class="card--character-info">Species: ${character.species}</p>
        <p class="card--character-info">Gender: ${character.gender}</p>
        <p class="card--character-info">Origin: ${character.origin.name}</p>
        <p class="card--character-info">Location: ${character.location.name}</p>
    `;

    cardsContainer.appendChild(characterCard);
}

const renderCharacters = async (url) => {
    const data = await fetchCharacters(url);

    if (data.error) {
        console.error(data.error);
    }
    else {
        const cardsContainer = document.querySelector("#cards-container");

        if (data.status !== 200 ) {
            console.warn(`There is a problem with the request. Status code: ${data.status}`);
        }
        else {
            const listOfCharacters = data.characters.results;

            listOfCharacters.forEach(character => addCharacterToPage(character, cardsContainer));
        }
    }
}

renderCharacters(URL_GET_CHARACTERS);