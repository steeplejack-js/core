/**
 * Exception
 *
 * This is the main error object for the library. It
 * is an extension of the global Error object and can
 * be extended infinitely.
 *
 * This is an abstract class and can't be instantiated
 * directly - it must be extended.
 *
 * The Error class is difficult to extend so the actual
 * extension is a bit hacky, using the util.inherits
 * method.
 */

/* Node modules */
import * as util from "util";

/* Third-party modules */
import * as _ from "lodash";

/* Files */
import {IException} from "../interfaces/exception";

export abstract class Exception implements IException {

  public message: string;

  public stack: string;

  public type: string;

  /**
   * Name
   *
   * Polyfill for the Error.name parameter
   *
   * @returns {string}
   */
  get name (): string {
    return (<any> this.constructor).name;
  }

  /**
   * Constructor
   *
   * Ensures that the object is correctly
   * configured
   *
   * @param {string} message
   */
  public constructor (message: any = "UNKNOWN_ERROR") {

    /* Call the parent class */
    Error.apply(this, arguments);

    /* Ensure the exception type is set */
    if (_.isEmpty(this.type)) {
      throw new SyntaxError("Exception type must be set");
    }

    /* Build the error stack */
    if (message instanceof Error) {
      /* Use the given stack and message */
      let err = message;
      message = err.message;
      this.stack = err.stack;
    } else {
      /* Error not passed in - build the stack */
      this.stack = (new Error()).stack;
    }

    /* Set the message */
    this.message = message;

  }

  /**
   * Get Detail
   *
   * Decides what to display if this error
   * bubbles-up to the output.
   *
   * @returns {{type: string, message: string}}
   */
  public getDetail (): any {
    return {
      message: this.message,
      type: this.type,
    };
  }

  /**
   * Get HTTP Code
   *
   * This is the HTTP status code if this error
   * bubbles-up to the output.
   *
   * @returns {number}
   */
  public getHttpCode (): number {
    return 500;
  }

}

/* Extend the Error class */
util.inherits(Exception, Error);
