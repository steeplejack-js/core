/**
 * index.test
 */

/* Node modules */

/* Third-party modules */

/* Files */
const {expect} = require('../helpers/configure');
const core = require('../../src/index');
const Base = require('../../src/lib/base');
const Exception = require('../../src/exception');
const FatalException = require('../../src/exception/fatal');
const ValidationException = require('../../src/exception/validation');

describe("Index tests", function () {

  it("should expose the objects", function () {

    expect(core).to.have.keys([
      "Base",
      "Exception",
      "FatalException",
      "ValidationException"
    ]);

    expect(core.Base).to.be.equal(Base);
    expect(core.Exception).to.be.equal(Exception);
    expect(core.FatalException).to.be.equal(FatalException);
    expect(core.ValidationException).to.be.equal(ValidationException);

  });

});
