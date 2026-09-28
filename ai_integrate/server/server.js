const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Check API key
console.log(
    "Gemini API KEY:",
    process.env.GEMINI_API_KEY ? "FOUND" : "NOT FOUND"
);


// Gemini setup
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// Gemini function
async function generateResponse(prompt) {

    try {

        const response = await ai.models.generateContent({

            model: "gemini-3.7-flash",

            contents: prompt

        });

        return response.text;

    } catch (error) {

        console.log("Gemini STATUS:", error.status);
        console.log("Gemini MESSAGE:", error.message);

        throw error;
    }
}


// Test route
app.get("/", (req, res) => {

    res.send("Backend is working");

});


// Chat API
app.post("/api/chat", async (req, res) => {

    try {

        // Get prompt from frontend
        const { prompt } = req.body;


        // Check prompt
        if (!prompt || !prompt.trim()) {

            return res.status(400).json({

                error: "Prompt is required"

            });

        }


        // Send prompt to Gemini
        const result = await generateResponse(prompt);


        // Send result to frontend
        res.json({

            result: result

        });

    } catch (error) {

        console.error("Gemini API Error:", error);


        // Gemini temporarily unavailable
        if (error.status === 503) {

            return res.status(503).json({

                error: "Gemini service is temporarily busy. Please try again later."

            });

        }


        // Invalid API key
        if (error.status === 401 || error.status === 403) {

            return res.status(error.status).json({

                error: "Gemini API key is invalid or unauthorized."

            });

        }


        // Other errors
        res.status(500).json({

            error: "Gemini API request failed."

        });

    }

});


// Start server
app.listen(5000, () => {

    console.log("server is running on port 5000");

});