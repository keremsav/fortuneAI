require('dotenv').config({path:"../.env"});
let OpenAI = require('openai');
const  z = require("zod");
const zodResponseFormat = require('openai/helpers/zod');


const openai = new OpenAI({
    apiKey : process.env.API_KEY,
});

async function openAICall(cards) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Imagine you are a skilled fortune teller using cartomancy to provide insights into the past,the present and the future. I have selected the following three cards: ${cards}. Please provide a detailed and mystical reading for these cards, interpreting their symbolic meanings and how they might relate to the querent's life journey. Give the answer in Turkish.
` }],
        model: "gpt-4o-mini",

    });
    return completion.choices[0];
}

module.exports = {openAICall};


