require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({
  origin: "https://smart-ai-resume-builder.vercel.app", // ✅ Allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],  // ✅ Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"]  // ✅ Allowed headers
}));app.use(express.json());

const PORT = process.env.PORT || 5000;
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

const GEMINI_MODEL = "models/gemini-1.5-pro-002";

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} Request to ${req.url}`);
  console.log("Body:", req.body);
  next();
});
app.post("/generate-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required!" });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/${GEMINI_MODEL}:generateContent?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No AI suggestion available.";
    res.json({ suggestion: aiText });
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate AI suggestion.",
      details: error.response?.data || error.message,
    });
  }
});

app.post("/resume-feedback", async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const { resumeData } = req.body;
    if (!resumeData) return res.status(400).json({ error: "Resume data is required!" });

    const feedbackPrompt = `
      Analyze this resume and provide a professional evaluation:
      - Score (out of 100) based on completeness, clarity, and professionalism.
      - Identify missing key details or inconsistencies.
      - Suggest improvements for each section (summary, experience, skills, projects).
      - Evaluate ATS optimization (does it contain keywords? Is it formatted correctly?).

      Resume Data:
      ${JSON.stringify(resumeData)}
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/${GEMINI_MODEL}:generateContent?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: `Analyze this resume and provide feedback:\n\n${feedbackPrompt}` }] }]
      }
    );
    

    const feedbackText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback available.";


res.json({ feedback: feedbackText  });

    
  } catch (error) {
    res.status(500).json({ error: "Failed to generate resume feedback.", details: error.response?.data || error.message });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
