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
var __extends = undefined && undefined.__extends || function (d, b) {
  for (var p in b) {
    if (b.hasOwnProperty(p)) d[p] = b[p];
  }
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var Exception = function (_super) {
  __extends(Exception, _super);

  function Exception(message) {
    if (message === void 0) {
      message = "UNKNOWN_ERROR";
    }

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
}(Error);

exports.Exception = Exception;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJLElBQUksUUFBUSxRQUFSLENBQVI7O0FBRUE7O0FBRUE7Ozs7Ozs7OztBQVNBLElBQUksWUFBWSxhQUFhLFVBQVUsU0FBdkIsSUFBb0MsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQjtBQUNsRSxPQUFLLElBQUksQ0FBVCxJQUFjLENBQWQsRUFBaUI7QUFDZixRQUFJLEVBQUUsY0FBRixDQUFpQixDQUFqQixDQUFKLEVBQXlCLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUFQO0FBQzFCO0FBQ0QsV0FBUyxFQUFULEdBQWM7QUFDWixTQUFLLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNELElBQUUsU0FBRixHQUFjLE1BQU0sSUFBTixHQUFhLE9BQU8sTUFBUCxDQUFjLENBQWQsQ0FBYixJQUFpQyxHQUFHLFNBQUgsR0FBZSxFQUFFLFNBQWpCLEVBQTRCLElBQUksRUFBSixFQUE3RCxDQUFkO0FBQ0QsQ0FSRDs7QUFVQSxJQUFJLFlBQVksVUFBVSxNQUFWLEVBQWtCO0FBQ2hDLFlBQVUsU0FBVixFQUFxQixNQUFyQjs7QUFFQSxXQUFTLFNBQVQsQ0FBbUIsT0FBbkIsRUFBNEI7QUFDMUIsUUFBSSxZQUFZLEtBQUssQ0FBckIsRUFBd0I7QUFDdEIsZ0JBQVUsZUFBVjtBQUNEOztBQUVEO0FBQ0EsV0FBTyxJQUFQLENBQVksSUFBWjs7QUFFQTtBQUNBLFFBQUksRUFBRSxPQUFGLENBQVUsS0FBSyxJQUFmLENBQUosRUFBMEI7QUFDeEIsWUFBTSxJQUFJLFdBQUosQ0FBZ0IsNEJBQWhCLENBQU47QUFDRDs7QUFFRDtBQUNBLFNBQUssSUFBTCxHQUFZLEtBQUssV0FBTCxDQUFpQixJQUE3Qjs7QUFFQTtBQUNBLFFBQUksRUFBRSxRQUFGLENBQVcsT0FBWCxLQUF1QixFQUFFLEdBQUYsQ0FBTSxPQUFOLEVBQWUsT0FBZixDQUF2QixJQUFrRCxFQUFFLEdBQUYsQ0FBTSxPQUFOLEVBQWUsU0FBZixDQUF0RCxFQUFpRjtBQUMvRTtBQUNBLFdBQUssT0FBTCxHQUFlLFFBQVEsT0FBdkI7QUFDQSxXQUFLLEtBQUwsR0FBYSxRQUFRLEtBQXJCO0FBQ0QsS0FKRCxNQUlPO0FBQ0w7QUFDQSxXQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsWUFBTSxpQkFBTixDQUF3QixJQUF4QixFQUE4QixLQUFLLFdBQW5DO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7Ozs7QUFRQSxZQUFVLFNBQVYsQ0FBb0IsU0FBcEIsR0FBZ0MsWUFBWTtBQUMxQyxXQUFPO0FBQ0wsWUFBTSxLQUFLLElBRE47QUFFTCxlQUFTLEtBQUs7QUFGVCxLQUFQO0FBSUQsR0FMRDs7QUFPQTs7Ozs7Ozs7QUFRQSxZQUFVLFNBQVYsQ0FBb0IsV0FBcEIsR0FBa0MsWUFBWTtBQUM1QyxXQUFPLEdBQVA7QUFDRCxHQUZEOztBQUlBLFNBQU8sU0FBUDtBQUNELENBM0RlLENBMkRkLEtBM0RjLENBQWhCOztBQTZEQSxRQUFRLFNBQVIsR0FBb0IsU0FBcEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4Y2VwdGlvblxuICpcbiAqIFRoaXMgaXMgdGhlIG1haW4gZXJyb3Igb2JqZWN0IGZvciB0aGUgbGlicmFyeS4gSXRcbiAqIGlzIGFuIGV4dGVuc2lvbiBvZiB0aGUgZ2xvYmFsIEVycm9yIG9iamVjdCBhbmQgY2FuXG4gKiBiZSBleHRlbmRlZCBpbmZpbml0ZWx5LlxuICpcbiAqIFRoaXMgaXMgYW4gYWJzdHJhY3QgY2xhc3MgYW5kIGNhbid0IGJlIGluc3RhbnRpYXRlZFxuICogZGlyZWN0bHkgLSBpdCBtdXN0IGJlIGV4dGVuZGVkLlxuICpcbiAqIFRoZSBFcnJvciBjbGFzcyBpcyBkaWZmaWN1bHQgdG8gZXh0ZW5kIHNvIGl0J3Mgd3JpdHRlblxuICogaW4gbmF0aXZlIEpTIHNvIHdlIGNhbiBjb250cm9sIGhvdyBpdCdzIGV4dGVuZGVkLiBJdCdzXG4gKiB3cml0dGVuIGluIEVTNS1mcmllbmRseSBjb2RlIHRvIG1heGltaXNlIGNvbXBhdGFiaWxpdHkuXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIE5vZGUgbW9kdWxlcyAqL1xuXG4vKiBUaGlyZC1wYXJ0eSBtb2R1bGVzICovXG5cbnZhciBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuLyogRmlsZXMgKi9cblxuLyoqXG4gKiBFeHRlbmRzXG4gKlxuICogU3RhbmRhcmQgZXh0ZW5kZXIgZnVuY3Rpb24gdGFrZW4gZnJvbVxuICogQmFiZWwvVHlwZVNjcmlwdCBjb21waWxlci5cbiAqXG4gKiBAdHlwZSB7Kn1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBfX2V4dGVuZHMgPSB1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fZXh0ZW5kcyB8fCBmdW5jdGlvbiAoZCwgYikge1xuICBmb3IgKHZhciBwIGluIGIpIHtcbiAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gIH1cbiAgZnVuY3Rpb24gX18oKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7XG4gIH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcblxudmFyIEV4Y2VwdGlvbiA9IGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgX19leHRlbmRzKEV4Y2VwdGlvbiwgX3N1cGVyKTtcblxuICBmdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlID09PSB2b2lkIDApIHtcbiAgICAgIG1lc3NhZ2UgPSBcIlVOS05PV05fRVJST1JcIjtcbiAgICB9XG5cbiAgICAvKiBDYWxsIHRoZSBwYXJlbnQgY2xhc3MgKi9cbiAgICBfc3VwZXIuY2FsbCh0aGlzKTtcblxuICAgIC8qIEVuc3VyZSB0aGUgZXhjZXB0aW9uIHR5cGUgaXMgc2V0ICovXG4gICAgaWYgKF8uaXNFbXB0eSh0aGlzLnR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJFeGNlcHRpb24gdHlwZSBtdXN0IGJlIHNldFwiKTtcbiAgICB9XG5cbiAgICAvKiBTZXQgdGhlIG5hbWUgKi9cbiAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG5cbiAgICAvKiBCdWlsZCB0aGUgZXJyb3Igc3RhY2sgKi9cbiAgICBpZiAoXy5pc09iamVjdChtZXNzYWdlKSAmJiBfLmhhcyhtZXNzYWdlLCBcInN0YWNrXCIpICYmIF8uaGFzKG1lc3NhZ2UsIFwibWVzc2FnZVwiKSkge1xuICAgICAgLyogVXNlIHRoZSBnaXZlbiBFcnJvcidzIG1lc3NhZ2Uvc3RhY2sgKi9cbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UubWVzc2FnZTtcbiAgICAgIHRoaXMuc3RhY2sgPSBtZXNzYWdlLnN0YWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBNZXNzYWdlIG5vdCBFcnJvciBpbnN0YW5jZSAtIHNldCBtZXNzYWdlL3N0YWNrICovXG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBEZXRhaWxcbiAgICpcbiAgICogRGVjaWRlcyB3aGF0IHRvIGRpc3BsYXkgaWYgdGhpcyBlcnJvclxuICAgKiBidWJibGVzLXVwIHRvIHRoZSBvdXRwdXQuXG4gICAqXG4gICAqIEByZXR1cm5zIHt7dHlwZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmd9fVxuICAgKi9cbiAgRXhjZXB0aW9uLnByb3RvdHlwZS5nZXREZXRhaWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZVxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBIVFRQIENvZGVcbiAgICpcbiAgICogVGhpcyBpcyB0aGUgSFRUUCBzdGF0dXMgY29kZSBpZiB0aGlzIGVycm9yXG4gICAqIGJ1YmJsZXMtdXAgdG8gdGhlIG91dHB1dC5cbiAgICpcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIEV4Y2VwdGlvbi5wcm90b3R5cGUuZ2V0SHR0cENvZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIDUwMDtcbiAgfTtcblxuICByZXR1cm4gRXhjZXB0aW9uO1xufShFcnJvcik7XG5cbmV4cG9ydHMuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuIl19