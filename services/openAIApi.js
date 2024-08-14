require('dotenv').config({path:"../.env"});
let OpenAI = require('openai');

const openai = new OpenAI({
    apiKey : process.env.API_KEY,
});

async function openAICall(cards) {
    try {
        let prompt = `You are a master fortune teller, an expert in the ancient art of cartomancy. With your wisdom and intuitive powers, you can peer into the past, understand the mysteries of the present, and glimpse the paths that lead to the future. Before you lie three cards that have been drawn to illuminate the querent’s life journey: ${cards}. For each card, provide a detailed interpretation of its symbolic meaning, focusing on how it reveals lessons from the past, influences the present, and offers guidance for the future. Weave these insights together to craft a mystical, poetic, and deeply insightful reading that touches on emotions, personal growth, and potential challenges. The querent seeks not just information but a transformative message that resonates with their soul.`
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt}],
            model: "gpt-4o-mini",

        });
        return completion.choices[0];
    } catch (err) {
       console.log("Error on Open API call: " + err);
       throw new Error("Failed to get a response from OpenAPI.")
    }

}

module.exports = {openAICall};


