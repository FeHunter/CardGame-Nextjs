"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from '../../styles/deck.module.css';
import Card from '../../components/card/card';
import CardAI from '../../components/card/cardAI';
import CardButton from '../../components/cardButton/CardButton';
import BattleScreen from '../../components/battleScreem/BattleScreem'

export default function Deck() {

    const [loading, setLoading] = useState(true);
    const [loadPage, setLoadPage] = useState(parseInt(Math.random() * 42));

    const [battle, setBattle] = useState(false);

    // Cards
    const MAXCARDS = 3;
    const [currentPlayerCard, setCurrentPlayerCard] = useState(0);
    const [currentAiCard, setCurrentAiCard] = useState(parseInt(Math.random() * 2));
    const [deck, setDeck] = useState([]);
    const [AIdeck, setAIDeck] = useState([]);

    // Player and AI cards status
    const [playerCardsStatus, setPlayerCardsStatus] = useState({
        c1Atk: 0, c1Def: 0,
        c2Atk: 0, c2Def: 0,
        c3Atk: 0, c3Def: 0,
    });

    const [aiDeckCardsStatus, setAiDeckCardsStatus] = useState({
        c1Atk: 0, c1Def: 0,
        c2Atk: 0, c2Def: 0,
        c3Atk: 0, c3Def: 0,
    });

    const alphabetValues = {
        A: 7, B: 3, C: 5, D: 2, E: 8, F: 4, G: 9, H: 1, I: 6, J: 10,
        K: 7, L: 3, M: 5, N: 2, O: 8, P: 4, Q: 9, R: 1, S: 6, T: 10,
        U: 7, V: 3, W: 5, X: 2, Y: 8, Z: 4
    };

    function getStringValue(str, type) {
        if (typeof str === 'string') {
            let sum = 0;
            str = str.toUpperCase();
            for (let i = 0; i < str.length; i++) {
                const char = str[i];
                if (alphabetValues[char] !== undefined) {
                    sum += alphabetValues[char];
                }
            }
            // Add a larger variation for defense
            if (type === 'atk') {
                return sum;
            } else if (type === 'def') {
                // Apply a formula to ensure a significant difference
                return Math.max(sum - (Math.floor(Math.random() * (sum / 2))), 1); // Decrease by up to half of the attack value, but not below 1
            }
        }
        return 0;
    }

    // Load cards
    useEffect(() => {
        setLoading(true);
        loadCharacters();
    }, [loadPage]);

    // Load Cards Status
    useEffect(() => {
        if (deck.length > 0 && AIdeck.length > 0) {
            setPlayerCardsStatus({
                c1Atk: getStringValue(deck[0].name, 'atk'),
                c1Def: getStringValue(deck[0].name, 'def'),
                c2Atk: getStringValue(deck[1].name, 'atk'),
                c2Def: getStringValue(deck[1].name, 'def'),
                c3Atk: getStringValue(deck[2].name, 'atk'),
                c3Def: getStringValue(deck[2].name, 'def'),
            });

            setAiDeckCardsStatus({
                c1Atk: getStringValue(AIdeck[0].name, 'atk'),
                c1Def: getStringValue(AIdeck[0].name, 'def'),
                c2Atk: getStringValue(AIdeck[1].name, 'atk'),
                c2Def: getStringValue(AIdeck[1].name, 'def'),
                c3Atk: getStringValue(AIdeck[2].name, 'atk'),
                c3Def: getStringValue(AIdeck[2].name, 'def'),
            });
        }
    }, [deck, AIdeck, currentPlayerCard]);

    async function loadCharacters() {
        await fetch(`https://rickandmortyapi.com/api/character/?page=${loadPage}`)
            .then(res => res.json())
            .then(data => {
                let player_newCards = [];
                let ai_newCards = [];
                let usedCards = new Set();

                while (player_newCards.length < MAXCARDS) {
                    let player_card = data.results[parseInt(Math.random() * data.results.length)];
                    if (!usedCards.has(player_card.id)) {
                        usedCards.add(player_card.id);
                        player_newCards.push(player_card);
                    }
                }
                setDeck(player_newCards);

                while (ai_newCards.length < MAXCARDS) {
                    let ai_card = data.results[parseInt(Math.random() * data.results.length)];
                    if (!usedCards.has(ai_card.id)) {
                        usedCards.add(ai_card.id);
                        ai_newCards.push(ai_card);
                    }
                }
                setCurrentAiCard(parseInt(Math.random() * ai_newCards.length));
                setAIDeck(ai_newCards);
            })
            .catch(error => {
                console.log("Erro:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function randomDeck() {
        setLoadPage(parseInt(Math.random() * 42));
    }

    function battleMode (){
        setBattle(!battle);
        if (battle){
            randomDeck();
        }
    }

    return (
        <main className={style.main}>
            <section className={style.container}>
                <div className={style.cardPlayerDeck}>
                    {AIdeck.length > 0 && !loading ?
                        <CardAI
                            key={"Ai_Card"}
                            character={AIdeck[currentAiCard]}
                        />
                        :
                        <p>loading...</p>
                    }
                </div>
                <div className={style.cardPlayerDeck}>
                    <div>
                        {deck.length > 0 && !loading ?
                            <Card
                                key={"Player_Card"}
                                character={deck[currentPlayerCard]}
                                atk={playerCardsStatus[`c${currentPlayerCard + 1}Atk`]}
                                def={playerCardsStatus[`c${currentPlayerCard + 1}Def`]}
                                onClick={battleMode}
                            />
                            :
                            <p>loading...</p>
                        }
                    </div>
                    <div className={style.cardPlayerDeckActions}>
                        <CardButton onClick={() => {
                            if (currentPlayerCard < deck.length - 1) {
                                setCurrentPlayerCard(currentPlayerCard + 1);
                            } else {
                                setCurrentPlayerCard(0);
                            }
                        }} />
                    </div>
                </div>
            </section>
            <div className={style.pageButtons}>
                <button className="button" onClick={randomDeck}>New Deck</button>
                <Link href="/" className="button">Menu</Link>
            </div>
            {
                battle ?
                    <BattleScreen
                        endBattle={battleMode}
                        playerCard={deck[currentPlayerCard]}
                        playerAtk={playerCardsStatus[`c${currentPlayerCard + 1}Atk`]}
                        playerDef={playerCardsStatus[`c${currentPlayerCard + 1}Def`]}
                        enemyCard={AIdeck[currentAiCard]}
                        enemyAtk={aiDeckCardsStatus[`c${currentAiCard + 1}Atk`]}
                        enemyDef={aiDeckCardsStatus[`c${currentAiCard + 1}Def`]}
                    />
                :
                    ''
            }
        </main>
    );
}
