/**
 * fatal.test
 */

/* Node modules */

/* Third-party modules */

/* Files */
const FatalException = require('../../../src/exception/fatal');
const Exception = require('../../../src/exception');
const {expect} = require('../../helpers/configure');

describe("FatalException test", () => {

  describe("Instantiation tests", () => {

    it("should extend the Exception and Error classes", () => {

      var obj = new FatalException("message");

      expect(obj).to.be.instanceof(FatalException)
        .to.be.instanceof(Exception)
        .to.be.instanceof(Error);

      expect(obj.type).to.be.equal("FATAL");
      expect(obj.message).to.be.equal("message");
      expect(obj.stack).to.be.a("string").to.have.length.above(0);

    });

  });

});
