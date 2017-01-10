/**
 * exception.test
 */

/* Node modules */

/* Third-party modules */

/* Files */
const Exception = require('../../../src/exception');
const { expect } = require('../../helpers/configure');

describe('Exception test', () => {
  describe('Instantiation tests', () => {
    it('should throw an error if no type set', () => {
      class Child extends Exception { }

      let fail = false;

      try {
        new Child();
      } catch (err) {
        fail = true;

        expect(err).to.be.instanceof(SyntaxError);
        expect(err.message).to.be.equal('Exception type must be set');
      } finally {
        expect(fail).to.be.true;
      }
    });

    it('should allow a type to be set as a getter', () => {
      class Child extends Exception {

        get type () {
          return 'SOME_TYPE';
        }

      }

      const obj = new Child();

      expect(obj).to.be.instanceof(Child)
        .instanceof(Exception)
        .instanceof(Error);

      expect(obj.name).to.be.equal('Child');

      expect(obj.message).to.be.equal('UNKNOWN_ERROR');

      expect(obj.type).to.be.equal('SOME_TYPE');
    });

    it('should receive the arguments in the constructor and set message', () => {
      class Child extends Exception {

        get type () {
          return 'type';
        }

        constructor (message, ...args) {
          super(message);

          this.arg1 = args[0];
          this.arg2 = args[1];
        }

      }

      const obj = new Child('message', 'arg1', 'arg2');

      expect(obj.message).to.be.equal('message');
      expect(obj.arg1).to.be.equal('arg1');
      expect(obj.arg2).to.be.equal('arg2');

      expect(obj.stack).to.be.a('string')
        .to.contain('exception', 'index.test.ts');
    });

    it('should receive an instance of error as message and use that for message and stack', () => {
      class Child extends Exception {

        get type () {
          return 'type';
        }

      }

      const err = new Error('uh oh');

      const obj = new Child(err);

      expect(obj.message).to.be.equal('uh oh');

      expect(obj.stack).to.be.equal(err.stack);
    });
  });

  describe('methods', () => {
    describe('#getDetail', () => {
      it('should show the detail and default message', () => {
        class MyErr extends Exception {

          get type () {
            return 'MyErr';
          }

        }

        const obj = new MyErr();

        expect(obj.getDetail()).to.be.eql({
          type: 'MyErr',
          message: 'UNKNOWN_ERROR',
        });
      });

      it('should show the detail and set message', () => {
        class MyErr extends Exception {

          get type () {
            return 'MyErr';
          }

        }

        const obj = new MyErr('uh-oh');

        expect(obj.getDetail()).to.be.eql({
          type: 'MyErr',
          message: 'uh-oh',
        });
      });

      it("should set it's own getDetail method", () => {
        class MyErr extends Exception {

          get type () {
            return 'MyErr';
          }

          getDetail () {
            return this.message;
          }

        }

        const obj = new MyErr('uh-oh');

        expect(obj.getDetail()).to.be.equal('uh-oh');
      });
    });

    describe('#getHttpCode', () => {
      it('should show 500 as the default HTTP code', () => {
        class MyErr extends Exception {

          get type () {
            return 'MyErr';
          }

        }

        const obj = new MyErr();

        expect(obj.getHttpCode()).to.be.equal(500);
      });

      it('should override the HTTP code', () => {
        class MyErr extends Exception {

          get type () {
            return 'MyErr';
          }

          getHttpCode () {
            return 403;
          }

        }

        const obj = new MyErr();

        expect(obj.getHttpCode()).to.be.equal(403);
      });
    });
  });
});
