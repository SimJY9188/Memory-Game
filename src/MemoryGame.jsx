import React, {useState, useEffect} from "react";
import Card from "./Card.jsx";

import data from "./utils/data.js";

function MemoryGame () {
    const [cardsArray, setCardsArray] = useState([]);
    const [loadedCards, setLoadedCards] = useState(false);
    const [moves, setMoves] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [stopFlip, setStopFlip] = useState(false);
    const [won, setWon] = useState(0);

    const NewGame = () => {
        setLoadedCards(false);

        setMoves(0);
        setWon(0);

        // use setTimeout to have a smoother transition
        setTimeout(() => {
            // set data in random order, use .map to clone the object so that it won't directly edit the initial data object
            // it's okay if not clone the object also, but best practise is to clone
            const randomCardsArray = data.map(card => ({...card, matched: false}));
            setCardsArray(randomCardsArray.sort(() => 0.5 - Math.random()));
            setLoadedCards(true);
        }, 1000);
    };

    const removeSelection = () => {
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setMoves((prev) => prev + 1);
    }

    useEffect(() => {
        if (!loadedCards) return;
        console.log(cardsArray);
    }, [cardsArray]);

    useEffect(() => {
        // set data in random order
        setCardsArray(data.sort(() => 0.5 - Math.random()));
        setLoadedCards(true);
    }, []);

    // if 2 cards have been selected, check if both are same or not
    // if they are same = stop the flipping ability
    // else turn them back
    useEffect(() => {
        if (firstCard && secondCard) {
            setStopFlip(true);
            if (firstCard.name === secondCard.name) {
                setCardsArray((prev) => {
                    return prev.map((unit) => {
                        if (unit.name === firstCard.name) {
                            return {...unit, matched: true};
                        }
                        else {
                            return unit;
                        }
                    });
                })
                setWon((prev) => prev + 1);
                removeSelection();
            }
            else {
                // use setTimeout to delay the card from flipping back
                setTimeout(() => {
                    removeSelection();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    const handleSelectedCardFunction = (item) => {
        if (firstCard !== null && firstCard.id !== item.id) {
            setSecondCard(item);
        }
        else {
            setFirstCard(item);
        }
    };

    return (
        <div className="app">
            <div className="container">
                <div className="header">
                    <h1>Memory Game</h1>
                </div>

                <div className="board">
                    {
                        cardsArray.map((item) => (
                            <Card item={item}
                                  key={item.id}
                                  handleSelectedCardFunction={handleSelectedCardFunction}
                                  toggled={ !loadedCards ? false : // need to check for loadedCards to have a smoother UX experience
                                    (item === firstCard || item === secondCard || item.matched === true)
                                  }
                                  stopFlip={stopFlip} />
                        ))
                    }
                </div>

                {
                    won !== 6 ? (<div className="comments">Moves: {moves}</div>)
                              : (<div className="comments">You Won in {moves} Moves.</div>)
                }
                <button className="button" onClick={() => NewGame()}>New Game</button>
            </div>
        </div>
    )
}

export default MemoryGame;