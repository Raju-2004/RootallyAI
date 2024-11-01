const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const categoryRoutes = require('./routes/categoryRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const comboRoutes = require('./routes/comboRoutes');
const programRoutes = require('./routes/programRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/combos', comboRoutes);
app.use('/api/programs', programRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;