/**
 * Validation
 *
 * This is an error that can be recovered from.  Normally, this
 * would be invalid input from the client or similar.  Ultimately,
 * this would return something like an HTTP 4xx error.
 */

/* Node modules */

/* Third-party modules */
import { _ } from 'lodash';

/* Files */
import Detail from './detail';
import Exception from '../index';

module.exports = class ValidationException extends Exception {

  get type () {
    return 'VALIDATION';
  }

  /**
   * Add Error
   *
   * Adds a new error to this error
   *
   * @param {string} key
   * @param {*} value
   * @param {string} message
   * @param {*} additional
   * @returns {ValidationException}
   */
  addError (key, value, message, additional = undefined) {
    /* If key not set, throw error */
    if (_.isEmpty(key)) {
      throw new SyntaxError('KEY_MUST_BE_SET');
    }

    /* Create the error detail object */
    const err = Detail.toModel(value, message, additional);

    /* Validate the error and tell the developer if done incorrectly */
    err.validate();

    /* Ensure that we have an array to store our latest error */
    if (_.has(this.errors, key) === false) {
      this.errors[key] = [];
    }

    /* Add in the new error */
    this.errors[key].push(err);

    return this;
  }

  /**
   * Get Errors
   *
   * Gets the errors contained in this object. Convert
   * the Detail classes to object literals.
   *
   * @returns {TResult}
   */
  getErrors () {
    return _.reduce(this.errors, (result, errors, key) => {
      const element = [];

      _.each(errors, (err) => {
        element.push(err.toDTO());
      });

      result[key] = element;

      return result;
    }, {});
  }

  /**
   * Has Errors
   *
   * Do we have any errors?
   *
   * @returns {boolean}
   */
  hasErrors () {
    return _.isEmpty(this.errors) === false;
  }

};
