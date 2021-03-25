/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const taskRoutes = require('../routes/taskRoutes');
const connectDB = require('../db/dbConfig');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.NODE_ENV === 'test' ? 6378 : process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
