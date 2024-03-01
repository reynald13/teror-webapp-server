const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./dabatase/db.js');
const participantRouter = require('./routes/participants.js');

mongoose.connect(config.DB)
    .then(() => console.log('Database is connected'))
    .catch(err => console.error('Can not connect to the database', err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', participantRouter);

// Menggunakan nilai PORT yang tersedia atau port 3000 sebagai default
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
