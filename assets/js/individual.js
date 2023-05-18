const encuentralo = document.getElementById('encuentralo')
const buscalo = document.getElementById('buscalo')
const myModal = new bootstrap.Modal( document.querySelector('#pokeModal'), {keyboard:false} )

const pokeModal =document.querySelector('#pokeModal .modal-content')

const mensajeModal = ( info ) =>{
    mensaje.innerHTML = `${info}`
}

encuentralo.addEventListener("click", ()=>{
    fetchPokemon(buscalo.value)
})

const url = 'https://pokeapi.co/'

function fetchPokemon(name) {
    fetch(`${url}api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {

        createPokemon(data);
        myModal.toggle()
        spinner.style.display = "none";
      })
      .catch((err) => {
          console.log(err)
      })
  }

function createPokemon(pokemon) {
    pokeModal.removeChild(pokeModal.firstChild);
  
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
  
    const card = document.createElement("div");
    card.classList.add("pokemon-block");
  
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");
  
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
  
    spriteContainer.appendChild(sprite);
  
    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
  
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

  
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(progressBars(pokemon.stats));
    
  
    cardContainer.appendChild(card);
    
    pokeModal.appendChild(cardContainer);
  }


  function progressBars(stats) {
    const statsContainer = document.createElement("canvas");
    statsContainer.classList.add("stats-container");
    const data = {
        labels: [stats[0].stat.name, stats[1].stat.name, stats[2].stat.name],
        datasets: [{
            label: 'Habilidades Pokemon',
            data: [stats[0].base_stat,stats[1].base_stat, stats[2].base_stat],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    const myChart = new Chart(statsContainer, {type: 'pie', data: data,});
  
    return statsContainer;
  }