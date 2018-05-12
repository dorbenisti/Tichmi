const assert = require("assert");
const f = require("../server/geneticAlgo");

describe("test", () => {
    it('should test1', (done) => {
        f((bestCandidate, generation) => {
            done(assert.equal(bestCandidate.value, "HELLO WORLD"));
        })
    })
});