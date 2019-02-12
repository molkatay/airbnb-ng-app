const express = require('express');
const mongoose = require('mongoose');
const config  = require('./config/dev');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URI, { useCreateIndex: true,
    useNewUrlParser: true }).then(()=> {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

const app = express();

// Models
const Rental = require('./models/rental');

app.use('/api/v1/rentals', rentalRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`Server Running at ${PORT}`)
});