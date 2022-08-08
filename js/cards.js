const URL_GET_CHARACTERS = "https://rickandmortyapi.com/api/character";

const fetchCharacters = async (url) => {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const characters = await response.json();

            return { status: response.status, characters };
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
        <div class="card--info-container">
            <h3 class="card--character-name">${character.name}</h3>
            <p class="card--character-info character-status ${character.status.toLowerCase()}">Status: ${character.status}</p>
            <p class="card--character-info">Species: ${character.species}</p>
            <p class="card--character-info">Gender: ${character.gender}</p>
            <p class="card--character-info">Origin: ${character.origin.name}</p>
            <p class="card--character-info">Location: ${character.location.name}</p>
        </div>
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

        if (data.status !== 200) {
            console.warn(`There is a problem with the request. Status code: ${data.status}`);
        }
        else {
            const listOfCharacters = data.characters.results;

            sessionStorage.prev = data.characters.info.prev;
            sessionStorage.next = data.characters.info.next;

            listOfCharacters.forEach(character => addCharacterToPage(character, cardsContainer));
        }
    }
}

const handleBtnClick = event => {
    const cardsContainer = document.querySelector("#cards-container");
    let newUrl = "";

    if (event.target.id === "btn-prev") {
        newUrl = sessionStorage.prev;
    }
    else if (event.target.id === "btn-next") {
        newUrl = sessionStorage.next;
    }

    if (newUrl === undefined || newUrl === "null" || newUrl === "") {
        console.warn("Can't keep going.");
    }
    else {
        cardsContainer.innerHTML = "";
        renderCharacters(newUrl);
    }
        
}

const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");

btnPrev.addEventListener("click", handleBtnClick);
btnNext.addEventListener("click", handleBtnClick);

renderCharacters(URL_GET_CHARACTERS);