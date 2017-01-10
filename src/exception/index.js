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
 * The Error class is difficult to extend so it's written
 * in native JS so we can control how it's extended. It's
 * written in ES5-friendly code to maximise compatability.
 */


/* Node modules */

/* Third-party modules */

const _ = require('lodash');

/* Files */

module.exports = class Exception extends Error {

  constructor (message) {
    super(message);

    if (message === undefined) {
      message = 'UNKNOWN_ERROR';
    }

    /* Ensure the exception type is set */
    if (_.isEmpty(this.type)) {
      throw new SyntaxError('Exception type must be set');
    }

    /* Set the name */
    this.name = this.constructor.name;

    this.errors = {};

    /* Build the error stack */
    if (_.isObject(message) && _.has(message, 'stack') && _.has(message, 'message')) {
      /* Use the given Error's message/stack */
      this.message = message.message;
      this.stack = message.stack;
    } else {
      /* Message not Error instance - set message/stack */
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
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
  getDetail () {
    return {
      type: this.type,
      message: this.message,
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
  getHttpCode () {
    return 500;
  }

};
