/**
 * extender.test
 *
 * Written in JS as it's difficult getting
 * it to work in TypeScript as not designed
 * that way.
 */

/* Node modules */

/* Third-party modules */

/* Files */
var expect = require("../../helpers/configure").expect;
var extender = require("../../../helpers/extender").extender;

describe("extender test", function () {

  it("should throw a TypeError when no function sent as the constructor", function () {

    [
      null,
      true,
      false,
      2.3,
      2,
      "string",
      void 0,
      {},
      []
    ].forEach(function (Constructor) {

      var fail = false;

      try {
        extender(Constructor);
      } catch (err) {

        fail = true;

        expect(err).to.be.instanceof(TypeError);
        expect(err.message).to.be.equal("The Constructor must be a function");

      } finally {

        expect(fail).to.be.true;

      }

    });

  });

  it("should throw an error if the prototypeProps is not an object", function () {

    [
      null,
      true,
      false,
      2.3,
      2,
      "string",
      function () {},
      []
    ].forEach(function (protoProps) {

      var fail = false;

      try {
        extender(function () {}, protoProps);
      } catch (err) {

        fail = true;

        expect(err).to.be.instanceof(TypeError);
        expect(err.message).to.be.equal("The prototype properties must be an object");

      } finally {

        expect(fail).to.be.true;

      }

    });

  });

  it("should throw an error if the staticProps is not an object", function () {

    [
      null,
      true,
      false,
      2.3,
      2,
      "string",
      function () {},
      []
    ].forEach(function (staticProps) {

      var fail = false;

      try {
        extender(function () {}, void 0, staticProps);
      } catch (err) {

        fail = true;

        expect(err).to.be.instanceof(TypeError);
        expect(err.message).to.be.equal("The static properties must be an object");

      } finally {

        expect(fail).to.be.true;

      }

    });

  });

  it("should extend a Constructor with no properties", function () {

    /* Not a realistic scenario, but could be done */

    var Constructor = function () {

      this.fn1 = function () { return 2; };

    };
    Constructor.staticFn = function () { return 3; };

    var Child = extender(Constructor);

    var obj = new Child();

    expect(obj.super_).to.be.equal(Constructor.prototype);

    expect(obj).to.be.instanceof(Child)
      .instanceof(Constructor);

    expect(obj.fn1).to.be.a("function");
    expect(obj.fn1()).to.be.equal(2);

    expect(Child.staticFn).to.be.a("function");
    expect(Child.staticFn()).to.be.equal(3);

    expect(Child.super_).to.be.equal(Constructor);

  });

  it("should extend a Constructor with some properties", function () {

    var Constructor = function () {

      this.fn1 = function () { return 2; };

    };
    Constructor.staticFn = function () { return 3; };

    var Child = extender(Constructor, {
      fn2: function () { return 4; }
    }, {
      staticFn1: function () { return 5; }
    });

    var obj = new Child();

    expect(obj.super_).to.be.equal(Constructor.prototype);
    expect(Child.staticFn1()).to.be.equal(5);

    expect(Child.super_).to.be.equal(Constructor);

    expect(Child).to.be.a("function");

    expect(obj).to.be.instanceof(Child)
      .instanceof(Constructor);

    expect(obj.fn1).to.be.a("function");
    expect(obj.fn1()).to.be.equal(2);

    expect(obj.fn2).to.be.a("function");
    expect(obj.fn2()).to.be.equal(4);

    expect(Child.staticFn).to.be.a("function");
    expect(Child.staticFn()).to.be.equal(3);

    expect(Child.staticFn1).to.be.a("function");

  });

  it("should ignore an error when extending 'caller' and 'arguments'", function () {

    var Constructor = function () {

      this.fn1 = function () { return 2; };

    };
    Constructor.staticFn = function () { return 3; };

    var Child = extender(Constructor, {
      fn2: function () { return 4; }
    }, {
      staticFn1: function () { return 5; },
      caller: function () {},
      arguments: function () {}
    });

    var obj = new Child();

    expect(obj.super_).to.be.equal(Constructor.prototype);
    expect(Child.staticFn1()).to.be.equal(5);

    expect(Child.super_).to.be.equal(Constructor);

    expect(Child).to.be.a("function");

    expect(obj).to.be.instanceof(Child)
      .instanceof(Constructor);

    expect(obj.fn1).to.be.a("function");
    expect(obj.fn1()).to.be.equal(2);

    expect(obj.fn2).to.be.a("function");
    expect(obj.fn2()).to.be.equal(4);

    expect(Child.staticFn).to.be.a("function");
    expect(Child.staticFn()).to.be.equal(3);

    expect(Child.staticFn1).to.be.a("function");

  });

  it("should extend an extended Constructor with some properties", function () {

    var Constructor = function () {

      this.fn1 = function () { return 2; };

    };
    Constructor.staticFn = function () { return 3; };

    var Child = extender(Constructor, {
      fn2: function () { return 4; }
    }, {
      staticFn1: function () { return 5; }
    });

    var Grandchild = extender(Child, {
      fn3: function () { return 6; }
    }, {
      staticFn2: function () { return 7; }
    });

    var obj = new Grandchild();

    expect(obj.super_).to.be.equal(Child.prototype);
    expect(obj.super_.super_).to.be.equal(Constructor.prototype);

    expect(Child).to.be.a("function");

    expect(obj).to.be.instanceof(Grandchild)
      .instanceof(Child)
      .instanceof(Constructor);

    expect(Grandchild.super_).to.be.equal(Child);
    expect(Child.super_).to.be.equal(Constructor);

    expect(obj.fn1).to.be.a("function");
    expect(obj.fn1()).to.be.equal(2);

    expect(obj.fn2).to.be.a("function");
    expect(obj.fn2()).to.be.equal(4);

    expect(obj.fn3).to.be.a("function");
    expect(obj.fn3()).to.be.equal(6);

    expect(Grandchild.staticFn).to.be.a("function");
    expect(Grandchild.staticFn()).to.be.equal(3);

    expect(Grandchild.staticFn1).to.be.a("function");
    expect(Grandchild.staticFn1()).to.be.equal(5);

    expect(Grandchild.staticFn2).to.be.a("function");
    expect(Grandchild.staticFn2()).to.be.equal(7);

  });

});
