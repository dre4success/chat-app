const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Jen',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      }
    ];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = { id: '123', name: 'dre', room: 'office' };

    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    let usersRemoved = users.removeUser('1');
    expect(usersRemoved.id).toBe('1');
    expect(users.users.length).toBe(2)
  });
  it('should not remove user', () => {
    let userNotRemoved = users.removeUser('4');
    expect(userNotRemoved).toEqual()
    expect(users.users.length).toBe(3)
  });

  it('should find user', () => {
    let user = users.getUser('2')
    expect(user.id).toBe('2')
  });

  it('should not find user', () => {
    let usernotFound = users.getUser('4')
    expect(usernotFound).toEqual()
  });

  it('should names for node course', () => {
    let userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });
  it('should names for react course', () => {
    let userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });
});
