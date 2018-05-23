const Genetical = require('genetical');

/*
Filter teachers that have the requested subject
Filter by minPrice
group_lesson incompatability will add 1000 points
maxPrice violation will add 1000 points

  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `is_teacher` tinyint(1) NOT NULL,
  `gender` int(1) NOT NULL COMMENT '0=male\n1=female',
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `city_id` int(11) NOT NULL,
  `group_lesson` int(1) NOT NULL,
  PRIMARY KEY (`id`),

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `image_url` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `teacher_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `max_price` int(11) NOT NULL,
  `max_km_distance` int(11) NOT NULL,
  `min_price` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `student_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

student: {
    group_lesson: bool,
    max_price: int,
    max_km_distance: int,
    lon,
    lat
}
teachers: [{
    group_lesson: bool,
    price: int,
    lon,
    lat
}]
*/

function getDistanceBetweenCoordinatesInKM({lat: lat1, lon: lon1}, {lat: lat2, lon: lon2}) {
    const p = Math.PI / 180;
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
}

function fitnessEvaluator(teacher, student) {
    let errorsSum = getDistanceBetweenCoordinatesInKM(teacher, student);

    if (teacher.group_lesson !== student.group_lesson) errorsSum += 100;
    if (teacher.price > student.max_price) errorsSum += (teacher.price - student.max_price);

    const { avgRating } = teacher;
    if (avgRating === 0) {
        errorsSum += 100;
    } else if (avgRating < 4) {
        errorsSum += Math.max(100, (3 - avgRating) * 100);
    } else if (avgRating === 4) {
        errorsSum += 25;
    }

    return errorsSum;
}

module.exports = (student, teachers, N = 15) => {
    const teachersWithScores = teachers.map(teacher => ({
        teacher,
        score: fitnessEvaluator(teacher, student)
    }));

    const ordered = teachersWithScores.sort((a, b) => a.score - b.score);
    const firstN = ordered.slice(0, Math.min(N, ordered.length));
    return Promise.resolve(firstN.map(({teacher}) => teacher));
}

 /*
module.exports = (student, teachers, N = 15) => {
    const options = {
        populationSize: 100,
        populationFactory: () => {},
        terminationCondition: terminationCondition,
        fitnessEvaluator: fitnessEvaluator,
        natural: false,
        evolutionStrategy: [Genetical.CROSSOVER, Genetical.MUTATION],
        evolutionOptions: {
            crossover: crossover,
            mutate: mutate,
            mutationProbability: 0.02
        },
        elitism: 0.05
    };

    function terminationCondition(stats) {
        return (stats.bestScore < 50) || stats.generation === 1000;
    }

    function mutate(candidate, mutationProbability, generator, callback) {
        callback(candidate);
    }

    function fitnessEvaluator(candidate, callback) {
        candidate = candidate.value;
        let errorsSum = getDistanceBetweenCoordinatesInKM(candidate, student);

        if (candidate.group_lesson !== student.group_lesson) errorsSum += 100;
        if (candidate.price > student.max_price) errorsSum += 100;

        const { avgRating } = candidate;
        if (avgRating === 0) {
            errorsSum += 50;
        } else if (avgRating < 4) {
            errorsSum += Math.max(100, (3 - avgRating) * 100);
        } else if (avgRating === 4) {
            errorsSum += 25;
        }

        return callback(null, errorsSum);
    }

    function crossover(parent1, parent2, points, generator, callback) {
        return callback([parent1, parent2]);
    }

    const algorithm = new Genetical(options);

    let population;
    algorithm.on('initial population created', function (initialPopulation) {
        if (!population) {
            population = initialPopulation;
        }
    });

    algorithm.on('population evaluated', p => {
        population = p;
    });

    return new Promise((resolve, reject) => {
        algorithm.on('error', reject);

        const internalStructure = teachers.map(t => ({ value: t }));
        algorithm.solve(internalStructure, () => {
            const orderedPopulation = [...population].sort((a, b) => a.score - b.score);
            const firstN = orderedPopulation.slice(0, Math.min(N, orderedPopulation.length - 1));
            const dataToRet = firstN.map(pair => pair.value);

            resolve(dataToRet);
        });
    });
};

function getDistanceBetweenCoordinatesInKM({lat: lat1, lon: lon1}, {lat: lat2, lon: lon2}) {
    const p = Math.PI / 180;
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
} */