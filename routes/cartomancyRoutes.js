const express = require('express');
let router = express.Router();
let {openAICall} = require('../services/openAIApi');
let {shuffleDeck,shuffleRandomDeck,topChosenCards,selectCards} = require('../controllers/cardsController');
let baseDeck = require('/Users/keremsav/WebstormProjects/fortuneAI/deck_of_cards.json');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 0, checkperiod: 600 });

const storeDeckInCache = (deck) => {
    cache.set('shuffledDeck', deck);
};

const getDeckFromCache = () => {
    return cache.get('shuffledDeck');
};

const storeUsedCardsInCache = (cards) => {
    cache.set('usedCards', cards);
};

const getUsedCardsFromCache = () => {
    return cache.get('usedCards') || [];
};
router.get('/cartomancy', async function(req,res) {
    try {
        let storedDeck = getDeckFromCache();
        console.log('Stored Deck:', storedDeck);

        let usedCards = getUsedCardsFromCache();
        console.log('Used Cards:', usedCards);

        // Reshuffle if necessary
        if (!storedDeck || storedDeck.length < 3) {
            storedDeck = shuffleRandomDeck(baseDeck);
            console.log('Newly Shuffled Deck:', storedDeck);

            usedCards = [];
            storeDeckInCache(storedDeck);
            storeUsedCardsInCache(usedCards);
        }

        let chosenCards =  topChosenCards(storedDeck);
        usedCards.push(chosenCards);
        storeUsedCardsInCache(usedCards);
        console.log('Chosen Cards:', chosenCards);

        storedDeck = storedDeck.slice(3);
        storeDeckInCache(storedDeck);

        let resultDeck = await openAICall(chosenCards);
        console.log('OpenAI Response:', resultDeck);

        res.send(resultDeck).status(200);
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;