const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Moved up

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

// Root Route
app.get('/', (req, res) => {
  res.send('LocalLift Backend Running!');
});

// API Routes
app.use('/api/users', userRoutes);   // Optional: make more specific
app.use('/api/auth', authRoutes);    // ✅ Register before app.listen
app.use('/api/requests', require('./routes/requestRoutes'));

// Port & Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
