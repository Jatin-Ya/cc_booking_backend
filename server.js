require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
console.log(process.env.DATABASE);

mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log('Db connceted sucessfully')
  }).catch((err)=>{console.log('err',err.message)});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});