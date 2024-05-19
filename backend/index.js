const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const zod = require('zod');
const rootRouter = require('./routes/index.js');
// const { User } = require('./db.js');
// const {secret} = require('./config.js')
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected to MongoDb');
  } catch (err) {
    console.log('error connection to MongoDB:', err.message);
  }
};
connectToMongo();
app.use(cors());

app.use(bodyParser.json());
app.use('/api/v1', rootRouter);

app.listen(3000);

// /api/v1/users/signup
// /api/v1/user/signin
// /api/v1/user/changePassword   ....

// /api/v1/account/transferMoney
// /api/v1/account/balance
