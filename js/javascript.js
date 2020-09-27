// Estado da Aplicação

let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationsList = 0;
let totalPopulationsFavorites = 0;

let numberFormat = null;



window.addEventListener('load', () => {
    tabCountries = document.querySelector('#tabCountries');
    tabFavorites = document.querySelector('#tabFavorites');
    
    countCountries = document.querySelector('#countCountries');
    countFavorites = document.querySelector('#countFavorites');

    totalPopulationsList = document.querySelector('#totalPopulationsList');
    totalPopulationsFavorites = document.querySelector('#totalPopulationsFavorites');

    numberFormat = Intl.NumberFormat(['pt-BR']);

    fetchCountries();
})

function fetchCountries () {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(json => {
            allCountries = json.map(country => {

                const { numericCode, population, flag } = country
                return {
                    id: numericCode,
                    name: country.translations.pt,
                    population,
                    formattedPopulation: formatNumber(population),
                    flag
                }
            })

        render();
        });
}

function render() {
    renderCountryList();
    renderFavorites();
    renderSumary();
    renderCountryButtons();
}

function renderCountryList() {
    let countriesHTML = "<div>";

    allCountries.forEach(country => {
        const { name, flag, id, population, formattedPopulation } = country;

        const countryHTML = `
            <div class='country'>
                <div>
                <a id="${id}" class="waves-effect waves-light btn">+</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}"></>
                </div>
                <div>
                    <ul>
                        <li> ${name} </li>
                        <li> ${formattedPopulation} </li>
                    </ul>
                </div>
                
            </div>
        `;

        countriesHTML += countryHTML;
    })

    countriesHTML += "</div>";

    tabCountries.innerHTML = countriesHTML;
}
function renderFavorites() {
    let favoritesHTML = "<div>";

    favoriteCountries.forEach(favorite => {
        const { name, flag, id, population, formattedPopulation } = favorite;

        const favoriteHTML = `
            <div class='country'>
                <div>
                <a id="${id}" class="waves-effect waves-light btn red darken-4">+</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}"></>
                </div>
                <div>
                    <ul>
                        <li> ${name} </li>
                        <li> ${formattedPopulation} </li>
                    </ul>
                </div>
                
            </div>
        `;

        favoritesHTML += favoriteHTML;
    })

    favoritesHTML += "</div>";
    tabFavorites.innerHTML = favoritesHTML;
}
function renderSumary() {

    countCountries.textContent = allCountries.length;
    countFavorites.textContent = favoriteCountries.length;

    const totalPopulation = allCountries.reduce(( accumulator, current) => {
        return accumulator + current.population;
    }, 0);

    const totalFavorites = favoriteCountries.reduce(( accumulator, current) => {
        return accumulator + current.population;
    }, 0);

    totalPopulationsList.textContent = formatNumber(totalPopulation);
    totalPopulationsFavorites.textContent = formatNumber(totalFavorites);
}
function renderCountryButtons() {
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
    const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));


    countryButtons.forEach(button => {
        button.addEventListener('click', () => addTofavorites(button.id));
    })

    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => removeFromfavorites(button.id));
    })
}


function addTofavorites(id){
    const countryToAdd = allCountries.find(country => country.id === id);

    favoriteCountries = [...favoriteCountries, countryToAdd];

    favoriteCountries.sort((a, b) =>{
        return a.name.localeCompare(b.name);
    });

    allCountries = allCountries.filter(country => country.id !== id);

    render();
}

function removeFromfavorites(id){
    const countryToRemove = favoriteCountries.find(country => country.id === id);

    allCountries = [...allCountries, countryToRemove];

    allCountries.sort((a, b) =>{
        return a.name.localeCompare(b.name);
    });

    favoriteCountries = favoriteCountries.filter(country => country.id !== id);

    render();
}

function formatNumber(number){
    return numberFormat.format(number);
}