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
    let pastCard = deck[0].suit + "-" + deck[0].value;
    let presentCard = deck[1].suit + "-" + deck[1].value;
    let futureCard = deck[2].suit + "-" + deck[2].value;
    return pastCard + " " + presentCard + " " + futureCard;
};
let selectCards = (firstCard,secondCard,thirdCard,deck) => {
    firstCard = Number(firstCard)-1;
    secondCard = Number(secondCard)-1;
    thirdCard = Number(thirdCard)-1;
    let pastCard = deck[firstCard].suit + "-" + deck[firstCard].value;
    let presentCard = deck[secondCard].suit + "-" + deck[secondCard].value;
    let futureCard = deck[thirdCard].suit + "-" + deck[thirdCard].value;
    return pastCard + " " + presentCard + " " + futureCard;
};

module.exports = {
    shuffleDeck,
    shuffleRandomDeck,
    topChosenCards,
    selectCards
};



