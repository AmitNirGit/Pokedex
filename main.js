const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButon");
const picture = document.getElementById("picture");
const divContainer = document.getElementById("divContainer");
const typesElement = document.getElementsByClassName("types");
const typeListDiv = document.getElementById("typeListDiv");
let currentPokemon = "";

const getTypeData = async (targetType) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/type/${targetType}`);
  return data;
}

const searchPokemon = async (pokemonId) => {
  try {
    const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    makeDiv(data.name, data.height, data.weight, data.sprites.front_default, data.sprites.back_default, data.types);
  }
  catch (e) {
    window.alert('no such pokemon or id!');
  }
};

const makeDiv = (name, height, weight, picture, back, types) => {
  currentPokemon = name;
  const htmlText = `<div id="card"
        <li class="card-title">Name: ${name}</li>
        <li>height: ${height}</li>
        <li>weight: ${weight}</li>
        <li><img class = "card-image" src="${picture}"
        onmouseover="this.src='${back}';"
        onmouseout="this.src='${picture}';"/>
        </div>`
  divContainer.innerHTML = htmlText;
  searchInput.value = "";
  let typeDiv = document.createElement("div");
  typeDiv.innerHTML = "pokemon types : "
  types.forEach((typesObj) => {
    let li = document.createElement("li");
    li.className = "types"
    li.innerHTML = typesObj.type.name;
    typeDiv.appendChild(li);
  });
  divContainer.appendChild(typeDiv);

}





//event listeneres
searchButton.addEventListener("click", () => {
  searchPokemon(searchInput.value);
})



divContainer.addEventListener("click", (event) => {
  if (event.target.className === "types") {
    targetType = event.target.innerHTML;
    getTypeData(targetType).then(result => {
      typeListDiv.innerHTML = "";
      result.pokemon.forEach(pokemonObj => {
        let typeListLi = document.createElement("li");
        typeListLi.className = "typeListClass"
        typeListLi.innerHTML = pokemonObj.pokemon.name;
        typeListDiv.appendChild(typeListLi);
      });
    })
  }
});

typeListDiv.addEventListener("click", (event) => {
  if (event.target.className === "typeListClass") {
    typeListDiv.innerHTML = "";
    searchPokemon(event.target.innerHTML);

  }
})
