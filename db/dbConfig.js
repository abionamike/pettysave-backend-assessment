/* eslint-disable eol-last */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const resp = await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${resp.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;