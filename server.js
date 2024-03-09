const express = require('express');
const path = require('path');
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

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other requests by serving the index.html file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Menggunakan nilai PORT yang tersedia atau port 4200 sebagai default
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
