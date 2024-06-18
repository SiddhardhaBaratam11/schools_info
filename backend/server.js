const express = require('express');
const connectDB = require('./config/db');
const schoolsRoutes = require('./routes/schools');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
// const adminRoutes = require('./routes/admin');

const app = express();


// Middleware for serving static files from 'uploads' directory
// app.use('/uploads', express.static('./uploads'));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../frontend/build");
app.use(express.static(buildpath));
app.use(bodyParser.json());
// Routes
app.use('/api/schools', schoolsRoutes);
// app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
