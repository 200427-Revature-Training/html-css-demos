const submitE = document.getElementById('submit-button');


submitE.addEventListener('click', () => {    
    // Get data from input field
    const inputE = document.getElementById('poke-input');
    const pokeValue = inputE.value;
    // Start HTTP request function
    queryPokeAPI(pokeValue);
});

/* 
    ! important document functions
    .getElementById(id) - Retrieve single element by id name
    .getElementsByClassName(class) - Retrieve array of elements by class name
    .getElementsByTagName(h1) - Retrieve array of elements with provided tag name
    .getElementsByName(name) - Get array of input elements by assigned attribute
    .querySelector(.my-class) - Get single element using CSS-like selector
    .querySelectorAll(.my-class) - Get array of elements using CSS-like selector
    .createElement(p) - create new element provided a tag name
*/

const queryPokeAPI = async (pokemon) => {
    // Building URL to send request to
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    // Fetch can be used to send an HTTP request
    // Sending the request - first data to come back is metadata, actual
    // response body is not prepared yet
    const response = await fetch(url);

    // await response.json() - resolve when the body has completed and is
    // parsed as JSON data to a JS object.
    const data = await response.json();
    updateUI(data);
}

const updateUI = (pokeData) => {
    const { id, name } = pokeData;
    const spriteUrl = pokeData.sprites.front_default;
    const types = pokeData.types.map(i => i.type.name);

    // Populate text with id and name
    const pokeIdE = document.getElementById('poke-id');
    const pokeNameE = document.getElementById('poke-name');

    // For elements that hold text (not input), innerText can be used
    // to safely assign text content 
    pokeIdE.innerText = id;
    pokeNameE.innerText = name;

    // unhide the text
    const pokeTextContainerE = document.getElementById('poke-text-container');
    // Removing a class using classList.remove
    pokeTextContainerE.classList.remove('hidden');

    // set image src to spriteUrl
    const pokeImgE = document.getElementById('poke-img');
    // Update image src by modifying element src property
    pokeImgE.src = spriteUrl;

    // depopulate types list
    const typeContainerE = document
        .getElementById('type-container');
    
    // .children is an array and can be treated like one
    while(typeContainerE.children.length > 0) {
        // Can remove child by passing an element to removeChild
        typeContainerE.removeChild(
            typeContainerE.children[0]
        );
    }


    // populate types list with types loaded from API
    const typeElements = types.map(type => {
        // new elements can be created using createElement
        const element = document.createElement('li');
        element.innerText = type;
        element.classList.add('type');
        return element;
    })

    // Append each type to typeContainerE
    typeElements.forEach(e => typeContainerE.appendChild(e));
}