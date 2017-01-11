/**
 * Detail
 *
 * The detail object for a validation error
 */

/* Node modules */

/* Third-party modules */
import { _ } from 'lodash';

/* Files */

module.exports = class Detail {

  constructor ({ message, value, additional }) {
    this.message = message;
    this.value = value;
    this.additional = additional;
  }

  /**
   * To DTO
   *
   * Converts the class to a data
   * transfer object
   *
   * @returns {object}
   */
  toDTO () {
    const obj = _.pick(this, [
      'message',
      'value',
    ]);

    /* Add the optional additional tag */
    if (_.isUndefined(this.additional) === false) {
      obj.additional = this.additional;
    }

    return obj;
  }

  /**
   * Validate
   *
   * Validates this instance, throw an error
   * if invalid.
   *
   * @returns {boolean}
   */
  validate () {
    if (_.isEmpty(this.message)) {
      throw new SyntaxError('MESSAGE_MUST_BE_SET');
    }

    return true;
  }

  /**
   * To Model
   *
   * Factory to create an instance of this
   * class
   *
   * @param {*} value
   * @param {string} message
   * @param {*} additional
   * @returns {Detail}
   */
  static toModel (value, message, additional = undefined) {
    return new Detail({
      value,
      message,
      additional,
    });
  }

};
