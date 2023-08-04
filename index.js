const express = require("express");

const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 3000; // Change the port number as needed

// Body parser middleware to parse JSON data
app.use(express.json());
app.use(cors());
// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API route for GPT-3.5 turbo
app.post("/chat", async (req, res) => {
  const { input } = req.body;

  console.log(input);

  try {
    const messages = [];

    messages.push({ role: "user", content: input });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const completion_text = completion.data.choices[0].message.content;
    res.json(completion_text);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started and listening on http://localhost:${port}`);
});
