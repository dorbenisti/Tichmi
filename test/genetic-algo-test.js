const assert = require("assert");
const f = require("../server/ourGeneticAlgo");

describe("test", () => {
    it('should test1', () => {
        const student = {
            group_lesson: true,
            max_price: 1000,
            max_km_distance: 100,
            lon: 10,
            lat: 10
        };

        const teachers = [{
            id: 1,
            group_lesson: true,
            price: 100,
            lon: 10,
            lat: 10
        },{
            id: 2,
            group_lesson: false,
            price: 100,
            lon: 10,
            lat: 10
        },{
            id: 3,
            group_lesson: true,
            price: 100,
            lon: 1000,
            lat: 1000
        },{
            id: 4,
            group_lesson: true,
            price: 10000,
            lon: 1000,
            lat: 1000
        }];

        const N = 2;

        return f(student, teachers, N).then(res => {
            assert.equal(res.length, N);
            assert.equal(res[0], teachers[0]);
            assert.equal(res[1], teachers[1]);
        });
    })
});