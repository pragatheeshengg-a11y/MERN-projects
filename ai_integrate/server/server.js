const express=require("express");
const cors=require("cors");
const {GoogleGenAI}=require("@google/genai");
require("dotenv").config({ path: "./.env" });

const app=express();
app.use(cors());
app.use(express.json());

const ai= new GoogleGenAI(
    {apiKey:process.env.GEMINI_API}
)

app.post("/api/genai",async(req,res)=>{
    try{
        if (!req.body || !req.body.prompt) {
      return res.status(400).json({ message: "Prompt not found" }); // ADDED 'return' & status 400
    }
        const {prompt}=req.body;
    
        const response= await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents:prompt,
        })
        return res.json({result:response.text})
    }
    catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }

})
const port=process.env.PORT ||5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})