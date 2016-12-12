/**
 * index.test
 */

/* Node modules */

/* Third-party modules */

/* Files */
import {expect} from "../helpers/configure";
import * as core from "../../index";
import {Base} from "../../lib/base";
import {Exception} from "../../lib/exception";
import {FatalException} from "../../lib/exception/fatal";
import {ValidationException} from "../../lib/exception/validation";

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
