const mongoose = require("mongoose");


const mongoDb = process.env.MONGO_URL;
const PORT = 4000;

mongoose.connect(mongoDb);
const database= mongoose.connection

database.on('error', (error) => {
  console.error('Database connection error:', error);
});


database.once('connected', () => {
  console.log('Database Connected');
})