const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/index');  
require('dotenv').config();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const dbUrl = process.env.DB_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Expose-Headers",
    "Access-Token, Uid, x-pagination-total-count, x-pagination-page-count, x-pagination-start-record, x-pagination-end-record"
  );
  next();
});


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT =7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
