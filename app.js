const express = require('express');

const app = express();

app.use(express.json());

const requestRouter = require('./routes/requestsRoutes');
const userRouter = require('./routes/userRoutes');

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});



app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/users', userRouter);

// app.get('/', (req, es) => {
//     res.send('Hello World');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

module.exports = app;
