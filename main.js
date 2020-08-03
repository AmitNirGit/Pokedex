const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButon");

const searchPokemon = async (pokemonId) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  makeDiv(data.name, data.height, data.weight, data.sprites.front_default);
};

const makeDiv = (name, height, weight, picture) => {
  const htmlText = `
      <div class="pokemonContainer">
        <div>Name: ${name}</div>
        <div>height: ${height}</div>
        <div>weight: ${weight}</div>
        <div>picture: <img src="${picture}" /></div>
      </div>
    `;
  pokemonDiv.innerHTML = htmlText;
}



searchButton.addEventListener("click", () => {
  searchPokemon(searchInput.value);
})