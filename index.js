const express = require('express');
const data = require('./data.json');
const app = express();
const port = 3010;

// Middleware to parse JSON request body
app.use(express.json());



// Route to fetch students above a specified threshold
app.post('/students/threshold', (req, res) => {
  const { threshold } = req.body;

  // Validate the input
  if (typeof threshold !== 'number' || isNaN(threshold)) {
    return res.status(400).json({ error: 'Threshold must be a valid number.' });
  }

  // Filter students based on the threshold
  const filteredStudents = data.filter(student => student.total > threshold);

  // Prepare the response
  const response = {
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({
      name: student.name,
      total: student.total,
    })),
  };

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
