"use strict";


var Stopwatch1 = require("../js/stopwatch")

var assert = require('chai').assert;
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });

  it('should return smth', () => {
    assert.equal(100, 100);
  });

  // it('should return square', () => {
  //   assert.equal(pow.pow(10), 100);
  // });
});