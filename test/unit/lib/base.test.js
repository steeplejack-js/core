/**
 * Base.test
 */

/* Node modules */
const EventEmitter = require('events').EventEmitter;

/* Third-party modules */
const datautils = require('datautils');

/* Files */
const Base = require('../../../src/lib/base');
const { expect } = require('../../helpers/configure');

const datatypes = datautils.data;
const validation = datautils.validation;

describe('Base class', () => {
  describe('Methods', () => {
    describe('#clone', () => {
      it('should clone the Base method and remain an instance', () => {
        const obj = new Base();

        const clone = obj.clone();

        expect(clone).to.be.an.instanceof(Base)
          .to.be.an.instanceof(EventEmitter)
          .to.not.be.equal(obj);
      });

      it('should clone an extended Base method and remain an instance', () => {
        class Model extends Base {

          get constant () {
            return 23;
          }

          constructor (obj) {
            super();

            this.values = {};

            for (const key in obj) {
              this.setValue(key, obj[key]);
            }
          }

          _hidden () {
            return 'hello';
          }

          getValues () {
            return this.values;
          }

          setValue (key, value) {
            this.values[key] = value;
            return true;
          }

        }

        const obj = new Model({
          key1: 'val1',
        });

        const clone = obj.clone();

        expect(clone).to.be.an.instanceof(Model)
          .to.be.an.instanceof(Base)
          .to.be.an.instanceof(EventEmitter)
          .to.be.not.equal(obj);

        expect(clone.constant).to.be.equal(23);
        expect(clone.values).to.be.eql({
          key1: 'val1',
        });
        expect(clone.values).to.be.eql(obj.values)
          .to.not.be.equal(obj.values);
        expect(clone.getValues()).to.be.eql(obj.getValues())
          .to.not.be.equal(obj.getValues());
        expect(clone.setValue).to.be.equal(obj.setValue);
        expect(clone._hidden).to.be.equal(obj._hidden);
        expect(clone._hidden()).to.be.equal(obj._hidden());

        clone.setValue('key2', 'val2');
        expect(obj.values).to.be.eql({
          key1: 'val1',
        });
        expect(clone.values).to.be.eql({
          key1: 'val1',
          key2: 'val2',
        });

        /* Changing the values entirely now */
        expect(clone.getValues()).to.not.be.eql(obj.getValues());
      });
    });
  });

  describe('Static methods', () => {
    describe('datatypes', () => {
      it('should expose the datautils.data object', () => {
        expect(Base.datatypes).to.be.equal(datatypes);
      });
    });

    describe('validation', () => {
      it('should expose the datautils.validation object', () => {
        expect(Base.validation).to.be.equal(validation);
      });
    });
  });
});
