const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const res = generateMessage('Admin', 'Welcome');
    expect(res.from).toBe('Admin');
    expect(res.text).toBe('Welcome');
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const lat = 1.2;
    const long = 1.3;

    const res = generateLocationMessage('Admin', lat, long)
    expect(res.url).toBe('https://www.google.com/maps?q=1.2,1.3');
    expect(typeof res.createdAt).toBe('number');
    expect(res.from).toBe('Admin')
  });
});
