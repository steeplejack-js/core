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

/**
 * Extends
 *
 * Standard extender function taken from
 * Babel/TypeScript compiler.
 *
 * @type {*}
 * @private
 */
function extender (d, b) {
  _.each(b, (p) => {
    if (Object.prototype.hasOwnProperty.call(b, p)) {
      d[p] = b[p];
    }
  });

  function Factory () {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (Factory.prototype = b.prototype, new Factory());
}

module.exports = (function iife (_super) {
  function Exception (message) {
    if (message === undefined) {
      message = 'UNKNOWN_ERROR';
    }

    /* Call the parent class */
    _super.call(this);

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

  extender(Exception, _super);

  /**
   * Get Detail
   *
   * Decides what to display if this error
   * bubbles-up to the output.
   *
   * @returns {{type: string, message: string}}
   */
  Exception.prototype.getDetail = function getDetail () {
    return {
      type: this.type,
      message: this.message,
    };
  };

  /**
   * Get HTTP Code
   *
   * This is the HTTP status code if this error
   * bubbles-up to the output.
   *
   * @returns {number}
   */
  Exception.prototype.getHttpCode = function getHttpCode () {
    return 500;
  };

  return Exception;
}(Error));
