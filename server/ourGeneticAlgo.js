const Genetical = require('genetical');

/*
Filter teachers that have the requested subject
Filter by minPrice
Use Google Geomapping to get distances between cities, add distance in meters as points
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
*/

export default (student, teachers, callback, errCallback) => {
    const options = {
        populationSize: 100,
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

    const algorithm = new Genetical(options);

    let population;
    algorithm.on('initial population created', function (initialPopulation) {
        if (!population) {
            population = initialPopulation;
        }
    });

    algorithm.on('error', function (err) {
        errCallback(err);
    });

    algorithm.on('population evaluated', p => {
        population = p;
    })

    algorithm.solve(() => {
        const orderedPopulation = [...population].sortBy((a, b) => a.score - b.score);
        const first15 = orderedPopulation.slice(0, Math.min(14, orderedPopulation.length - 1));
        const dataToRet = first15.map(pair => pair.value);
        callback(dataToRet);
    });
};