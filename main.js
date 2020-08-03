const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButon");
const picture = document.getElementById("picture");
const divContainer = document.getElementById("divContainer");
let currentPokemon = "";

const getData = async (currentPokemon) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${currentPokemon}`);
  return data;
}

const searchPokemon = async (pokemonId) => {
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    makeDiv(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default);
  }
  catch (e) {
    window.alert("no such pokemon!");
  }
};

const makeDiv = (name, height, weight, picture, back) => {
  currentPokemon = name;
  const htmlText = `
      <div class="pokemonContainer">
        <div>Name: ${name}</div>
        <div>height: ${height}</div>
        <div>weight: ${weight}</div>
        <div>Pokemon Image: <br> <img src="${picture}"
        onmouseover="this.src='${back}';"
        onmouseout="this.src='${picture}';"/></div>`
  pokemonDiv.innerHTML = htmlText;
  searchInput.value = "";
}






searchButton.addEventListener("click", () => {
  searchPokemon(searchInput.value);
})