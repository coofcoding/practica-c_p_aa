
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const generatorFunctionComponent = element => {

    const genId = idGenerator();

    const button = document.createElement('button');
    button.innerText = 'Click Me';
    element.append(button);

    const renderButton = () => {
        const { value } = genId.next();
        button.innerText = `Click ${ value }`;
    }

    button.addEventListener('click', renderButton);

    // console.log( myGenerator.next() );
    // console.log( myGenerator.next() );
    // console.log( myGenerator.next() );
    // console.log( myGenerator.next() );
    // console.log( myGenerator.next() );

}

function* idGenerator() {
    let currentId = 0;

    while ( true ) {
        yield ++currentId;
    }
}

function* myFirstGeneratorFunction() {

    // El yield se encarga de pausar una función
    yield 'Primer Valor';
    yield 'Segundo Valor';
    yield 'Tercer Valor';
    yield 'Cuarto Valor';
 
}