const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/async-handler');
const env = require('../config/env');
const { User } = require('../db/models');

const signToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: 'fullName, email, and password are required.'
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const existingUser = await User.unscoped().findOne({ where: { email: normalizedEmail } });

  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName: String(fullName).trim(),
    email: normalizedEmail,
    passwordHash,
    role: 'customer'
  });

  const token = signToken(user);

  return res.status(201).json({
    data: {
      user,
      token
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'email and password are required.'
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await User.scope('withPassword').findOne({ where: { email: normalizedEmail } });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = signToken(user);
  const safeUser = await User.findByPk(user.id);

  return res.status(200).json({
    data: {
      user: safeUser,
      token
    }
  });
});

module.exports = {
  register,
  login
};


