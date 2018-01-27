const expect = require('expect');
const { isRealString } = require('./validation');

it('should reject non-string values', () => {
  const res = isRealString(24);
  expect(res).toBe(false);
});

it('should reject string with only spaces', () => {
  const res = isRealString('      ');
  expect(res).toBe(false);
});

it('should allow string with non-space characters', () => {
  const res = isRealString(' Andrew ');
  expect(res).toBe(true);
});
