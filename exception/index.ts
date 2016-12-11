/**
 * Exception
 *
 * This is the main error object for the library. It
 * is an extension of the global Error object and can
 * be extended infinitely.
 *
 * This is an abstract class and can't be instantiated
 * directly - it must be extended.
 */

/* Node modules */

/* Third-party modules */
import * as _ from "lodash";

/* Files */
import {IException} from "../interfaces/exception";

export abstract class Exception extends Error implements IException {

  public message: string = "UNKNOWN_ERROR";

  public type: string;

  /**
   * Constructor
   *
   * Ensures that the object is correctly
   * configured
   *
   * @param {*} message
   * @param {*} args
   */
  public constructor (message: any = null, ...args: any[]) {

    /* Call the parent class */
    super();

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
    if (_.isString(message)) {
      this.message = message;
    }

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
