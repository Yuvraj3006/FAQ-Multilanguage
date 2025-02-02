const redis = require("../config/redisConfig");
const FAQ = require("../models/sequelizeModels");
const translateText = require('../services/translationService')

async function handleGetFaq(req, res) {
    
    const lang = req.query.lang || 'en';
    const cacheKey = `faq_${lang}`;

    try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        // Fetch all FAQs from the database
        const FAQs = await FAQ.findAll();

        // Process translations
        const translatedFAQs = await Promise.all(
            FAQs.map(async (faq) => {
                let question = faq.getTranslatedText("question", lang);
                let answer = faq.getTranslatedText("answer", lang);

                // If translation doesn't exist, translate it and store it
                if (!question || !answer) {
                    [question, answer] = await Promise.all([
                        question ? question : translateText(faq.question, lang),
                            
                        answer ? answer : translateText(faq.answer, lang),
                    ]);

                    // Store the new translation in the database
                    faq.translations = {
                        ...faq.translations,
                        [lang]: { question, answer },
                    };

                    await faq.save(); // Save updated translations
                }

                return {
                    id: faq.id,
                    question,
                    answer,
                };
            })
        );

        // Store only the original FAQs in the cache (not translations)
       
        await redis.set(cacheKey, JSON.stringify(translatedFAQs));
        return res.status(200).json(translatedFAQs);
    } catch (error) {
        console.error(`The error occurred: ${error}`);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
}

async function handlePostFaq(req,res) {
    const { question ,answer } = req.body;
    try {
        
        const faq = await FAQ.create({question,answer});
        //console.log(faq);
        
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