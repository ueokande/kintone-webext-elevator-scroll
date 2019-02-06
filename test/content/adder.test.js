import * as adder from '../../src/content/adder.js'

describe('adder', () => {
  describe('#add', () => {
    it('adds a number', () => {
      expect(adder.add(10, 20)).to.equal(30);
    });
  })
});
