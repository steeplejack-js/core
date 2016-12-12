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

"use strict";

/* Node modules */

/* Third-party modules */
var _ = require("lodash");

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
var __extends = (this && this.__extends) || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Exception = (function (_super) {

  __extends(Exception, _super);

  function Exception (message) {

    if (message === void 0) { message = "UNKNOWN_ERROR"; }

    /* Call the parent class */
    _super.call(this);

    /* Ensure the exception type is set */
    if (_.isEmpty(this.type)) {
      throw new SyntaxError("Exception type must be set");
    }

    /* Set the name */
    this.name = this.constructor.name;

    /* Build the error stack */
    if (_.isObject(message) && _.has(message, "stack") && _.has(message, "message")) {
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
  Exception.prototype.getDetail = function () {
    return {
      type: this.type,
      message: this.message
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
  Exception.prototype.getHttpCode = function () {
    return 500;
  };

  return Exception;

}(Error));

exports.Exception = Exception;
