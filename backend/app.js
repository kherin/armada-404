const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

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

app.post('/openai', async (req, res) => {
  if (!req.body || !req.body.messages) {
      return res.status(400).send('Bad Request: Missing required fields');
  }

  try {
      const chatCompletion = await openai.chat.completions.create({
          messages: req.body.messages,
          model: 'gpt-3.5-turbo',
      });
      res.json(chatCompletion.choices);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});
