const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());

// Routes setup
const authRoutes = require('./src/routes/auth.routes');
const propertyRoutes = require('./src/routes/property.routes');

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/property', propertyRoutes);


 app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;