import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Bode McBride',
    email: 'bode@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Rossi McBride',
    email: 'rossi@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;