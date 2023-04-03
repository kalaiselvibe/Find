const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve the index.html file as the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define a route to handle requests for a specific find
app.get('/find/:name', (req, res) => {
  const findName = req.params.name;

  // Read the find data from the JSON file
  fs.readFile('./finds.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const findData = JSON.parse(data);

    // Find the find with the matching name
    const find = findData.finds.find(
      (a) => a.name.toLowerCase() === findName.toLowerCase()
    );

    if (!find) {
      res.status(404).json({ error: 'find not found' });
      return;
    }

    res.json(find);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
