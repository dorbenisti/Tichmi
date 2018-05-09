let Genetical = require('genetical');

let options = {
    populationSize: 100,
    populationFactory: populationFactory,
    terminationCondition: terminationCondition,
    fitnessEvaluator: fitnessEvaluator,
    natural: false,
    evolutionStrategy: [Genetical.CROSSOVER, Genetical.MUTATION],
    evolutionOptions: {
        crossover: crossover,
        mutate: mutate,
        mutationProbability : 0.02
    },
    islandOptions: {
        islands: 5,
        migration: 0.1,
        epoch: 10
    },
    elitism: 0.05,
    seed: 2
};

let stringAlgorithm = new Genetical(options);

let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
let solution = 'HELLO WORLD';
solution = /^[zA-Z\s]*$/.test(solution) ? solution.toUpperCase() : 'HELLO WORLD';

let population;
stringAlgorithm.on('initial population created', function (initialPopulation) {
    //console.log('initial population created', initialPopulation);
    if (!population) {
        population = initialPopulation;
    }
});

stringAlgorithm.on('error', function (err) {
    console.log('error', err);
});

function populationFactory(population, populationSize, generator, callback) {
    let string = '';

    for( let i=0; i < solution.length; i++ ) {
        string += alphabet.charAt(Math.floor(generator.random() * alphabet.length));
    }

    return callback(null, {value: string});
}

function mutate(candidate, mutationProbability, generator, callback) {
    for (let i = 0; i < candidate.value.length; i++)
    {
        if (generator.random() < mutationProbability)
        {
            let charIndex = getRandomInt(0, alphabet.length - 1, generator);
            let char = alphabet.charAt(charIndex);
            candidate.value = setCharAt(candidate.value, i, char);
        }
    }

    callback(candidate);
}

function fitnessEvaluator(candidate, callback) {
    let errors = 0;
    for (let i = 0; i < candidate.value.length; i++)
    {
        if (candidate.value.charAt(i) !== solution.charAt(i))
        {
            ++errors;
        }
    }

    return callback(null, errors);
}

function terminationCondition(stats) {
    return (stats.bestScore === 0) || stats.generation === 5000;
}

function crossover(parent1, parent2, points, generator, callback) {
    let child1 = {value: parent1.value};
    let child2 = {value: parent2.value};

    for (let i = 0; i < points; i++)
    {
        let crossoverIndex = (1 + getRandomInt(0, parent1.value.length - 1, generator));
        for (let j = 0; j < crossoverIndex; j++)
        {
            let temp = child1.value.charAt(j);
            child1.value = setCharAt(child1.value, j, child2.value.charAt(j));
            child2.value = setCharAt(child2.value, j, temp);
        }
    }

    return callback([child1, child2]);
}

function setCharAt(string, index, char) {
    return string.substr(0, index) + char + string.substr(index+char.length);
}

function getRandomInt(min, max, generator) {
    return Math.floor(generator.random() * (max - min + 1)) + min;
}

module.exports = callback => stringAlgorithm.solve(callback);