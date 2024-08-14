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
router.post('/cartomancy', async (req,res) => {
    try {
        const {firstCard,secondCard,thirdCard} = req.body;
        let storedDeck = getDeckFromCache();
        let usedCards = getUsedCardsFromCache();

        if (!storedDeck || storedDeck.length < 3) {
            storedDeck = shuffleRandomDeck(baseDeck);
            console.log('Newly Shuffled Deck:', storedDeck);
            usedCards = [];
            storeDeckInCache(storedDeck);
            storeUsedCardsInCache(usedCards);
        }
        let chosenCards;
        if(req.body.length>0) {
            chosenCards = selectCards(firstCard,secondCard,thirdCard,storedDeck);
        }else {
            chosenCards = topChosenCards(storedDeck);
            usedCards.push(chosenCards);  // Store the chosen cards
            storedDeck = storedDeck.slice(3);  // Remove the chosen cards from the deck
            storeDeckInCache(storedDeck);
            storeUsedCardsInCache(usedCards);

        }
        console.log('Chosen cards: ',chosenCards);
        let resultDeck = await openAICall(chosenCards);
        console.log('OpenAI Response:', resultDeck);
        res.send(resultDeck).status(200);
    } catch (err) {
        console.log('Error: ' , err);
        res.status(500).send({error : "Something went wrong with the cartomancy process."});
    }
})

module.exports = router;