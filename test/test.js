"use strict";

// var pow = require('../js/stopwatch.js');
// var pow = require()

var stopwatch = require("../js/stopwatch");

var assert = require('chai').assert;
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });

    it('should return 8', function () {
      assert.equal(stopwatch.pow(), 8);
    });
  });
});