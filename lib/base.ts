/**
 * Base
 *
 * This is the base class. Everything should be
 * extended from here. For ES6/CoffeeScript/TypeScript,
 * classes this will just add the clone method in
 * reality. If you are using ES5, this is how you
 * create an extendable class by using the .extend()
 * static method.
 */

/* Node modules */
import {EventEmitter} from "events";

/* Third-party modules */
import {data as datatypes, validation} from "datautils";
import * as _ from "lodash";

/* Files */
import {extender} from "../helpers/extender";

export class Base extends EventEmitter {

  /**
   * Extend
   *
   * Used for extending this class if using a
   * preprocessor that doesn't have the
   * "class Child extends Parent".
   *
   * If using a language that supports class
   * extension (ES6/TypeScript/CoffeeScript)
   * use that languages class extension rather
   * than this method.  This should be seen
   * as a polyfill rather than core functionality.
   *
   * @param {object} properties
   * @param {object} staticProperties
   * @returns {Function}
   */
  public static extend (properties: Object = {}, staticProperties: Object = {}): Function {
    return extender(this, properties, staticProperties);
  }

  /**
   * __construct
   *
   * The ES5 constructor method. Anything found here
   * will be executed as the constructor method.
   */
  protected __construct: Function; // tslint:disable-line:variable-name

  /**
   * Constructor
   *
   * Adds in a check for the _construct function,
   * to be called if this class is created using
   * the .extend() static method.
   *
   * @param {*} args
   */
  public constructor (...args: any[]) {

    /* Call parent class */
    super();

    /* Call the ES5 constructor */
    if (_.isFunction(this.__construct)) {
      this.__construct(...args);
    }

  }

  /**
   * Clone
   *
   * Clones the instance of the object, returning a
   * new instance of the object with the same values.
   *
   * @returns {Object}
   */
  public clone (): any {

    const prototype = Object.getPrototypeOf(this);

    const clonedObj = Object.create(prototype);

    Object.getOwnPropertyNames(this)
      .map((name) => {

        const obj = _.clone((<any> this)[name]);

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
   * @returns {"datautils".data}
   */
  public static get datatypes () {
    return datatypes;
  }

  /**
   * Validation
   *
   * Returns the validation parameter from
   * datautils package
   *
   * @returns {datautils.validation}
   */
  public static get validation () {
    return validation;
  }

}
