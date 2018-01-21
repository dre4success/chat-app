const expect = require('expect');
const generateMessage = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const res = generateMessage('Admin', 'Welcome');
    expect(res.from).toBe('Admin');
    expect(res.text).toBe('Welcome');
    expect(typeof res.createdAt).toBe('number');
  });
});
