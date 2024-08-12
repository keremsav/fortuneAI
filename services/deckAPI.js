const axios = require('axios');

let fetchDeckID = async () => {
    try {
        const response = await axios.get("https://www.deckofcardsapi.com/api/deck/new/");
        let deckID = response.data.deck_id;
        console.log("New Deck ID :" + deckID);
        return deckID;
    } catch (err) {
        console.log("Error fetching new deckID.", err.message);
    }
}

let fetchDeck = async (deckID) => {
    try{
        const response = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`);
        console.log(response);
        return response;
    } catch (err) {
        console.log("Error fetching new deck.", err.message);

    }



}

let fetchAllDeck = async () => { 
    try{
        let deckID = await fetchDeckID();
        let decks = await fetchDeck(deckID);
        return decks;
    } catch (err) {
        console.log(err);

    }
}

fetchAllDeck();