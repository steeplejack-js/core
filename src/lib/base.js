/**
 * Base
 *
 * This is the base class. Everything should be
 * extended from here. For ES6/CoffeeScript/TypeScript,
 * classes this will just add the clone method in
 * reality.
 */

/* Node modules */
import { EventEmitter } from 'events';

/* Third-party modules */
import { _ } from 'lodash';
import datautils from 'datautils';

/* Files */

module.exports = class Base extends EventEmitter {

  /**
   * Clone
   *
   * Clones the instance of the object, returning a
   * new instance of the object with the same values.
   *
   * @returns {Object}
   */
  clone () {
    const prototype = Object.getPrototypeOf(this);

    const clonedObj = Object.create(prototype);

    Object.getOwnPropertyNames(this)
      .forEach((name) => {
        const obj = _.clone(this[name]);

        Object.defineProperty(clonedObj, name, {
          configurable: true,
          enumerable: true,
          value: obj,
          writable: true,
        });
      });

    return clonedObj;
  }

  /**
   * Datatypes
   *
   * Returns the data parameter from the
   * datautils package
   *
   * @return {datautils.data}
   */
  static get datatypes () {
    return datautils.data;
  }

  /**
   * Validation
   *
   * Returns the validation parameter from
   * datautils package
   *
   * @return {datautils.validation}
   */
  static get validation () {
    return datautils.validation;
  }

};
