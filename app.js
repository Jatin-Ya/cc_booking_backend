const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
var cors = require('cors')

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/authRoutes');

app.use((req, res, next) => {
  const {token} = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      // req.user = decoded;
      return next();
    }
    catch (err) {
      console.log(err);
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid token! Please log in again.',
      });
    }
  }
  else {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please log in to get access.',
    });
  }
  // jwt.verify()
});

const requestRouter = require('./routes/requestsRoutes');
const userRouter = require('./routes/userRoutes');

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/users', userRouter);

// app.get('/', (req, es) => {
//     res.send('Hello World');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

module.exports = app;
