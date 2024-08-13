let baseDeck = require('/Users/keremsav/WebstormProjects/fortuneAI/deck_of_cards.json');
let {openAICall} = require('../services/openAIApi');
let shuffleDeck = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

let shuffleRandomDeck = (deck) => {
    const shuffleTime = Math.floor(Math.random() * 100);
    for (let i = 0; i < shuffleTime ; i++) {
        deck = shuffleDeck(deck)
    }
    return deck;
}
let newDeck = shuffleRandomDeck(baseDeck);

let topChosenCards = (deck) => {
    let pastCard = deck[0];
    let presentCard = deck[1];
    let futureCard = deck[2];
    return {pastCard, presentCard, futureCard};
};
let selectCards = (firstCard,secondCard,thirdCard,deck) => {
    let pastCard = deck[firstCard];
    let presentCard = deck[secondCard];
    let futureCard = deck[thirdCard];
    return {pastCard, presentCard, futureCard};
};

module.exports = {
    shuffleDeck,
    shuffleRandomDeck,
    topChosenCards,
    selectCards
};



