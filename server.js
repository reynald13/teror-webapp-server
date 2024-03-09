const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./dabatase/db.js');
const participantRouter = require('./routes/participants.js');

mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database is connected'))
    .catch(err => {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the process if database connection fails
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', participantRouter);

// Close the database connection properly when the app is closed or fails to start
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Database connection closed due to app termination');
        process.exit(0);
    });
});

// Using available PORT value or default port 4200
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
