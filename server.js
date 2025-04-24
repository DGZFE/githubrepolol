const express = require('express');
const OpenAI = require('openai');
const app = express();
const port = process.env.PORT || 3000;

const client = new OpenAI({
  baseURL: 'https://api.zukijourney.com/v1',
  apiKey: 'zu-2b4f3cebce6925b12020f9b57a1f1878', // Your provided API key
});

app.use(express.static('public'));
app.use(express.json()); // To parse JSON body

// Route to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to get study materials based on grade and subject
app.post('/get-study-material', async (req, res) => {
  const { grade, subject } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4.1-nano', // Use the preferred model
      messages: [{ role: 'user', content: `Provide a study guide for grade ${grade} on ${subject}` }],
    });

    res.json({ studyMaterial: response.choices[0].message.content });
  } catch (error) {
    res.status(500).send('Error fetching study materials');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
