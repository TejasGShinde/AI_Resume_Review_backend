// 


const fs = require('fs').promises;
const path = require('path');
const pdfParse = require('pdf-parse');

exports.geminiApi = async (req, res) => {
    try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI("AIzaSyCPW9qdWakz-SBNvCcfCQFPFU2S8PTjAYM");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
         console.log(__dirname)
        // const filePath = path.join(__dirname, '..', '/controllers/resume.pdf');
        // console.log(filePath)
        // try {
        //     await fs.access(filePath);
        // } catch (err) {
        //     return res.status(404).json({ error: "File not found" });
        // }
        const file = req.files[0];
        const dataBuffer = await fs.readFile(file.path);
        const pdfData = await pdfParse(dataBuffer);
        const extractedText = pdfData.text;

        const prompt = `Review the following resume data and give one line best job query to search based on resume  :\n\n${extractedText}`;
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        const cleanedResponse = responseText.replace(/\*/g, '').replace(/\n+/g, ' ').trim();
        res.status(200).json({ message: cleanedResponse });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};
exports.getResumeSummary = async (req, res) => {
    try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI("AIzaSyCPW9qdWakz-SBNvCcfCQFPFU2S8PTjAYM");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
         console.log(__dirname)
        // const filePath = path.join(__dirname, '..', '/controllers/resume.pdf');
        // console.log(filePath)
        // try {
        //     await fs.access(filePath);
        // } catch (err) {
        //     return res.status(404).json({ error: "File not found" });
        // }
        const file = req.files[0];
        const dataBuffer = await fs.readFile(file.path);
        const pdfData = await pdfParse(dataBuffer);
        const extractedText = pdfData.text;

        const prompt = ` Review the following resume data. Provide feedback point-wise, section-wise, and include the following:
  1. ATS (Applicant Tracking System) Score.
  2. A step-by-step or section-wise breakdown.
  3. Suggest improvements for each section.
  4. Suggest how to get noticed by recruiters : give point wise \n\n${extractedText}`;
        const result = await model.generateContent(prompt);
        const responseText = await result.response.json();

        const cleanedResponse = responseText.replace(/\*/g, '').replace(/\n+/g, ' ').trim();
        res.status(200).json({ message: cleanedResponse });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};
