const redis = require("../config/redisConfig");
const FAQ = require("../models/sequelizeModels");
const translateText = require('../services/translationService')

async function handleGetFaq(req, res) {
    const lang = req.query.lang || 'en'; // Default to 'en' if no language is specified
    const cacheKey = `faq_${lang}`;

    try {
        // If the cache exists and the language is 'en', we serve the original FAQs from the cache
        if (lang === 'en') {
            const cachedData = await redis.get(cacheKey); // Fetch from cache
            if (cachedData) {
                return res.status(200).json(JSON.parse(cachedData)); // Return cached data if found
            }
        }

        // Fetch all FAQs from the database
        const FAQs = await FAQ.findAll();
        const translatedFAQs = FAQs.map(faq => ({
            id: faq.id,
            question: faq.getTranslatedText("question", lang),  // Get translated text based on the lang
            answer: faq.getTranslatedText("answer", lang)
        }));

        // If the requested language is 'en', store the original FAQs in cache for future use
        if (lang === 'en') {
            await redis.set(cacheKey, JSON.stringify(translatedFAQs)); // Cache the original data
        }

        return res.status(200).json(translatedFAQs); // Return the translated FAQs

    } catch (error) {
        console.error(`The error occurred: ${error}`);
        return res.status(500).json({ 'Error': 'Internal Server Error' });
    }
}

async function handlePostFaq(req,res) {
    const { question ,answer,languages } = req.body;
    try {
        console.log(languages);
        const faq = await FAQ.create({question,answer});
        //console.log(faq);
        await addTranslations(faq,question,answer,languages );
        //console.log(faq);
        res.status(201).json(faq);
    } catch (error) {
        console.error(`The error occurred: ${error}`);
        return res.status(500).json({ 'Error': 'Internal Server Error' });
    }
}

async function addTranslations(faq,question,answer,languages) {
    const translations = {};
    //console.log(question,answer)
    for(const lang of languages){
        //console.log(lang)
       const [ questionTranslated ,answerTranslated] = await Promise.all([ 
        translateText(question,lang),
        translateText(answer,lang),
       ]);

       translations[lang] = {
        question : questionTranslated,
        answer : answerTranslated
       }
    }
    //console.log('\n\n',translations)
    faq.translations =  translations;
    await faq.save();
}

module.exports = { handleGetFaq,handlePostFaq};