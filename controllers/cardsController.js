let baseDeck = require('/Users/keremsav/WebstormProjects/fortuneAI/deck_of_cards.json');
let shuffleDeck = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

let shuffleRandomDeck = (deck) => {
    const shuffleTime = Math.floor(Math.random() * 100);
    console.log(shuffleTime);
    for (let i = 0; i < shuffleTime ; i++) {
        deck = shuffleDeck(deck)
    }
    return deck;
}
let newDeck = shuffleRandomDeck(baseDeck);





console.log(newDeck);
