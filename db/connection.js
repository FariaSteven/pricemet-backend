const mongoose = require("mongoose");
require('dotenv').config();

 const main = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected')
  } catch (error) {
    console.log(error);
  }
}

module.exports = main;