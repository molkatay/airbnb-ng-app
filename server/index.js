const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config  = require('./config/dev');
const FakeDb = require('./fake-db');


// Models
const Rental = require('./models/rental');
const User = require('./models/user');


const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URI, { useCreateIndex: true,
    useNewUrlParser: true }).then(()=> {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`Server Running at ${PORT}`)
});