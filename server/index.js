const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const cors = require('cors');

const app = express();

app.use(cors()); //set cors

const PORT = process.env.PORT || 8000;

app.use(express.json()); // Use the built-in JSON middleware
app.use(express.urlencoded({ extended: true })); // Use the built-in URL-encoded middleware


// Route...
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Port...
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});