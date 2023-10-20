const path = require('path');
const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

app.get('/status', (req, res) => {
    res.json({ status: "Server is up and running" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
