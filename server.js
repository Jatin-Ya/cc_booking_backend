const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log('Connected to database');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}