const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { User } = require('../db');
const {Account} = require('../db')
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');
// creating zod schema
const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

//signup router
router.post('/signup', async (req, res) => {
  const body = req.body;
  // zod validation
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.json({
      message: 'Email already taken / Incorrect inputs',
    });
  }
  const user = await User.findOne({
    username: body.username,
  });
  if (user) {
    return res.json({
      message: 'Email already taken / Incorrect inputs',
    });
  }
  const dbUser = await User.create(body);
  
  const userId = dbUser._id;

  /// ---- Create new account   ----
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000

  })

  /// -----   -----
  const token = jwt.sign(
    {
      userId
    },
    JWT_SECRET
  );
  res.json({
    message: 'User created successfully',
    token: token,
  });
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
router.post('/signin', async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.json({
      message: 'Incorrect inputs',
    });
  }
  const user = await User.findOne({
    username: body.username,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }
  res.json({
    message: 'Error while logging in',
  });
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put('/', authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.json({
      message: 'Error while updating information',
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  return res.json({
    message: 'Updated successfully',
  });
});

router.get('/bulk', async (req, res) => {
  const filter = req.query.filter || '';

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
  })
});

module.exports = router;