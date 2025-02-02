const axios = require("axios");
require("dotenv").config();

const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY; // Store API Key in .env

async function translateText(text, targetLang) {
    try {
        // Validate input
        if (!text || !targetLang) {
            throw new Error("Invalid input: text and target language are required.");
        }

        const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;

        const response = await axios.post(url, {
            q: text,  
            target: targetLang, // ✅ Ensure this is included
            source: "en",       // Optional, but can help
            format: "text"      // Optional, defaults to "text"
        },);

        // Check if the response contains the expected data
        if (response.data && response.data.data && response.data.data.translations) {
            return response.data.data.translations[0].translatedText;
        } else {
            throw new Error("Translation API response is invalid.");
        }
    } catch (error) {
        // Log the entire error object for more detailed debugging
        //console.error(`Error Occurred While Translating:`, error);
        return null;
    }
}

module.exports = translateText;