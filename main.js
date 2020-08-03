const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButon");
const picture = document.getElementById("picture");
let currentPokemon = "";

const getData = async (currentPokemon) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${currentPokemon}`);
  return data;
}

const searchPokemon = async (pokemonId) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  makeDiv(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default);
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

}
// picture.onmouseover = () => picture.src = res.data.sprites.back_default;
// picture.onmouseout = () => picture.src = res.data.sprites.front_default;






searchButton.addEventListener("click", () => {
  searchPokemon(searchInput.value);
})