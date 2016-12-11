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

export class Base extends EventEmitter {

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
