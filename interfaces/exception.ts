/**
 * exception
 */

/* Node modules */

/* Third-party modules */

/* Files */

export interface IException extends Error {
  getDetail: () => any;
  message: string;
  getHttpCode: () => number;
  type: string;
}
