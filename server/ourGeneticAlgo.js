const cloneDeep = require("lodash/cloneDeep");
const isObject = require("lodash/isObject");

function getDistanceBetweenCoordinatesInKM({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 }) {
    const p = Math.PI / 180;
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
}

function normalizeBetween1to10(teachers, trait, traitFunc = x => x) {
    const getTrait = t => traitFunc(t[trait]);
    const ratio = (Math.max(...teachers.map(getTrait)) / 10) || 1;

    return teachers.map(t => ({
        ...t,
        [trait]: getTrait(t) / ratio
    }));
}

/*
   coefficients: {
       distance: 1-10,
       price: 1-10,
       rating: 1-10,
       groupLesson: 1-10
   }
   */
function fitnessEvaluator(teacher, coefficients) {
    const { distance: distanceCF, price: priceCF, rating: ratingCF, groupLesson: groupLessonCF } = coefficients;
    const { group_lesson, distance, price, avgRating } = teacher;

    return ((distance * distanceCF) + (price * priceCF) + ((5 - avgRating) * ratingCF) + (group_lesson * groupLessonCF));
}

function normalizeTeachers(teachers, student) {
    const { group_lesson: studentGL, max_price: studentMaxPrice } = student;

    teachers = cloneDeep(teachers).map(t => ({
        ...t,
        distance: getDistanceBetweenCoordinatesInKM(t, student)
    }));

    teachers = normalizeBetween1to10(teachers, 'group_lesson', gl => (studentGL ^ gl) ? 3 : 0);
    teachers = normalizeBetween1to10(teachers, 'distance');
    teachers = normalizeBetween1to10(teachers, 'price');
    teachers = normalizeBetween1to10(teachers, 'avgRating');

    return teachers;
}

module.exports = (student, teachers, coefficients, N = 15) => {
    if (teachers.length <= 1) return teachers;

    const handler = {
        get: (target, name) => {
            return target.hasOwnProperty(name) ? target[name] : 1;
        }
    };

    coefficients = (isObject(coefficients) && coefficients) || {};
    const cfProxy = new Proxy(coefficients, handler);

    const teachersWithScores = normalizeTeachers(teachers, student).map(teacher => ({
        teacher,
        score: fitnessEvaluator(teacher, cfProxy)
    }));

    const ordered = teachersWithScores.sort((a, b) => a.score - b.score);
    const firstN = ordered.slice(0, Math.min(N, ordered.length));
    return Promise.resolve(firstN.map(({ teacher }) => teacher));
}