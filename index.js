const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('./config/passport.js');
require('./config/database.js');
const authRoute = require('./Routes/AuthRoute');
const courseRoutes = require('./Routes/CourseRoutes');
// CONSTANTS
const PORT = 4000;
const app = express();

// app.use((req, res, next) => {
//   // Allow requests from any origin
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   // Allow certain headers to be sent
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   // Allow certain HTTP methods
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

app.use(
  cors()
  //   {
  //   origin: ["http://localhost:4000", "http://localhost:3000"],
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   credentials: true,
  // }
  // )
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRoute);
app.use('/course', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
