
// const express = require('express');
// const mongoose = require('mongoose');

// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Middleware

// app.use(express.json());
// app.use(cors());


// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI).then(() => {

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)});

//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Failed to connect to MongoDB', err);
// });

// // Routes
// const userRoutes = require('./routes/userRoutes');

// const employeeRoutes = require('./routes/employeeRoutes');
// // const breweryRoutes = require('./routes/breweryRoutes');
// // const reqAuth = require('./middleware/reqAuth');

// app.use('/api/users', userRoutes);
// app.use('/api', employeeRoutes);
// // app.use('/api/breweries', breweryRoutes);



const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api', employeeRoutes);

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
if (true) {
    // Set static folder (Adjust 'client/build' if your frontend is in a different folder)
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle SPA by returning index.html for all unknown routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Default fallback for unmatched routes (404 handling)
app.use((req, res, next) => {
    res.status(404).json({ message: 'API route not found' });
});


