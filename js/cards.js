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
    inputPageNumber.value = sessionStorage.pageNumber;

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

            sessionStorage.numberOfPages = data.characters.info.pages;
            sessionStorage.prev = data.characters.info.prev;
            sessionStorage.next = data.characters.info.next;

            if ( sessionStorage.prev === "null" ) {
                btnPrev.classList.add("btn-disabled");
            } else {
                btnPrev.classList.remove("btn-disabled");
            }

            if ( sessionStorage.next === "null" ) {
                btnNext.classList.add("btn-disabled");
            } else {
                btnNext.classList.remove("btn-disabled");
            }

            listOfCharacters.forEach(character => addCharacterToPage(character, cardsContainer));
        }
    }
}

const handleBtnClick = event => {
    const cardsContainer = document.querySelector("#cards-container");
    let newUrl = "";
    let currentPageNumber = parseInt(sessionStorage.pageNumber);
    const totalPages = parseInt(sessionStorage.numberOfPages);

    if (event.target.id === "btn-prev") {
        newUrl = sessionStorage.prev;
        if (currentPageNumber - 1 >= 0) {
            currentPageNumber--;
        }
    }
    else if (event.target.id === "btn-next") {
        newUrl = sessionStorage.next;
        if (currentPageNumber + 1 <= totalPages) {
            currentPageNumber++;
        }
    }
    else if (event.target.id === "btn-go") {
        currentPageNumber = parseInt(inputPageNumber.value);

        if ((currentPageNumber >= 1) && (currentPageNumber <= totalPages)) {
            newUrl = `${URL_GET_CHARACTERS}?page=${currentPageNumber}`;
        } else {
            console.warn("Out of allowed range.");
        }
    }

    if (newUrl === undefined || newUrl === "null" || newUrl === "") {
        console.warn("Can't keep going.");
    }
    else {
        cardsContainer.innerHTML = "";
        sessionStorage.pageNumber = currentPageNumber;
        renderCharacters(newUrl);
    }
        
}

const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnGoToPage = document.querySelector("#btn-go");
const inputPageNumber = document.querySelector("#page-number");

btnPrev.addEventListener("click", handleBtnClick);
btnNext.addEventListener("click", handleBtnClick);
btnGoToPage.addEventListener("click", handleBtnClick);

if (sessionStorage.pageNumber === undefined) {
    sessionStorage.pageNumber = 1;
    renderCharacters(URL_GET_CHARACTERS);
} else {
    const currentUrl = `${URL_GET_CHARACTERS}?page=${sessionStorage.pageNumber}`;
    renderCharacters(currentUrl);
}