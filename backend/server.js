
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware

app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)});

    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Routes
const userRoutes = require('./routes/userRoutes');

const employeeRoutes = require('./routes/employeeRoutes');
// const breweryRoutes = require('./routes/breweryRoutes');
// const reqAuth = require('./middleware/reqAuth');

app.use('/api/users', userRoutes);
app.use('/api', employeeRoutes);
// app.use('/api/breweries', breweryRoutes);





