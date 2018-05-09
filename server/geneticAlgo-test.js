const f = require("./geneticAlgo");

describe("test", () => {
    it('should test1', (done) => {
        f((bestCandidate, generation) => {
            done();
        })
    })
});