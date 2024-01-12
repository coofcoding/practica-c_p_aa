import { heroes } from "../data/heroes"

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const promiseComponent = element => {

    /**
     * 
     * @param {(Object: heroes)} hero 
     */
    const renderHero = (hero) => {
        element.innerHTML = hero.name;
    }

    const renderError = (error) => {
        element.innerHTML = `
            <h3 class="error-msg">${error}</h3>
        `;
    }

    const renderTwoHeroes = (hero, hero2) => {
        element.innerHTML = `
            <h3>${hero.name}</h3>
            <h3>${hero2.name}</h3>
        `;
    }

    const id = '5d86371fd55e2e2a30fe1ccb';
    const id2 = '5d86371fd55e2e2a30fe1ccb2';

    let hero1;

    // Esta opción es útil cuando una de las promesas no depende de la respuesta de la otra, es decir, cuando cada una de las promesas 
    // trabaja de manera independiente, en caso de que si una de las promesas dependa de la otra, usaremos la !Forma 1, debido a que entre las dos
    // es la más fácil de entender o de manejar
    Promise.all([
        findHero(id),
        findHero(id2),
    ])
        .then(([hero, hero2]) => renderTwoHeroes(hero, hero2))
        .catch(renderError)

    //! Forma 1
    // findHero( id )
    //     .then( hero => {
    //         hero1 = hero;
    //         return findHero(id2);
    //     })
    //     .then( hero2 => {
    //         renderTwoHeroes(hero1, hero2);
    //     })
    //     .catch( renderError );

    //! Forma 2
    // findHero(id)
    //     .then( (hero) => {
    //         findHero( id2 )
    //         .then( hero2 => {
    //             renderTwoHeroes(hero, hero2);
    //         })
    //         .catch( renderError );
    //     })
    //     .catch(renderError)

}

/**
 * 
 * @param {String} id uuid of my hero
 * @returns {Promise}
 */
const findHero = (id) => (

    // El argumento `resolve` es el que me indica cuando una promesa se cumple, y al cumplirla, se ejecuta cierta función
    // El argumento `reject` indica que si la promesa no se cumplio correctamente, por lo tanto va a retornar un mensaje de error
    new Promise((resolve, reject) => {

        const hero = heroes.find(hero => hero.id === id);

        if (hero) {
            resolve(hero);
            return;
        };

        reject(`Hero with id ${id} not found.`);

    })

    // Si bien podemos almacenar la promesa en una variable, y posteriormente esa variable la retornamos, como en este caso solo usamos un return y no tenemos
    // nada más de código de funcionalidad dentro de esta, entonces simplemente podemos encerrar nuestra nueva promea dentro de parentesis para indicarle al
    // callback que retornaremos dicha promesa
)