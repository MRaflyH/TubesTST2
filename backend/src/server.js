require('dotenv').config();
const app = require('./app');
const connectDB = require('./db');

// Connect to MongoDB
(async () => {
  await connectDB();
  console.log("Database connected!");
})();

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
