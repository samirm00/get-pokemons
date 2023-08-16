import dom from '../dom.js';
import getPokemonById from '../../apis/getPokemonById.js';
import createPokemon from '../components/createPokemon.js';

const getPokemonHandler = async () => {
    // empty the root
    dom.root.innerHTML = '';
    const value = dom.input.value;

    // if no value
    if (!value) {
        dom.error.innerText = 'Please enter pokemon ids separated by "," ';
        dom.error.classList.add('error');
        return;
    }

    // check valid ids
    const validIds = [];
    const values = value.split(',');
    values.forEach((val) => {
        const valNum = Number(val);
        if (!Number.isNaN(valNum) && valNum > 0 && valNum < 1281) {
            validIds.push(valNum);
        }
    });

    // check if there are valid id(s)
    if (validIds.length === 0) {
        dom.error.innerText = 'your ids are not valid';
        dom.error.classList.add('error');
        return;
    }

    // remove error if exits
    if (dom.error.innerText !== '') {
        dom.error.innerText = '';
        dom.error.classList.remove('error');
    }

    const pokemonPromises = validIds.map((id) => getPokemonById(id));
    const pokemons = await Promise.all(pokemonPromises);

    pokemons.forEach((pokemonData) => {
        const pokemonDom = createPokemon(pokemonData);
        dom.root.append(pokemonDom);
    });
};

export default getPokemonHandler;
