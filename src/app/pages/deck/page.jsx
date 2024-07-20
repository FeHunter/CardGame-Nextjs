"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from '../../styles/deck.module.css';
import Card from '../../components/card/card';
import CardAI from '../../components/card/cardAI';
import CardButton from '../../components/cardButton/CardButton';

export default function Deack (){

    const [loading, setLoading] = useState(true);
    const [loadPage, setLoadPage] = useState(parseInt(Math.random() * 42));

    // Cards
    const MAXCARDS = 3;
    const [currentPlayerCard, setCurrentPlayerCard] = useState(0);
    const [currentAiCard, setAiPlayerCard] = useState(parseInt(Math.random()*2));
    const [deck, setDeck] = useState([]);
    const [AIdeck, setAIDeck] = useState([]);

    // Player cards status
    const [playerCardsStatus, setPlayerCardsStatus] = useState({
        c1Atk: 0, c1Def: 0,
        c1Atk: 0, c1Def: 0,
        c1Atk: 0, c1Def: 0,
    });

    useEffect(()=>{
        setLoading(true);
        loadCharacters();
    },[loadPage]);
    
    async function loadCharacters (){
        await fetch(`https://rickandmortyapi.com/api/character/?page=${loadPage}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.results);
            // set deck cards
            setDeck([]);
            let player_newCards = [];
            let player_card;
            let usedCards = new Set();
            while (player_newCards.length < MAXCARDS) {
                player_card = data.results[parseInt(Math.random() * data.results.length)];
                if (!usedCards.has(player_card)) {
                    usedCards.add(player_card);
                    player_newCards.push(player_card);
                }
            }
            setDeck(player_newCards);

            // AI deck
            setAIDeck([]);
            let ai_newCards = [];
            let ai_card;
            while (ai_newCards.length < MAXCARDS) {
                ai_card = data.results[parseInt(Math.random() * data.results.length)];
                if (!usedCards.has(ai_card)) {
                    usedCards.add(ai_card);
                    ai_newCards.push(ai_card);
                }
            }
            setAiPlayerCard(parseInt(Math.random() * ai_newCards.length-1));
            setAIDeck(ai_newCards);
        })
        .catch(error => {
            console.log("Erro:", error);
            return [];
        })
        .finally (()=>{
            setLoading(false);
            console.log("finalizado");
        });
    }

    function randomDeck (){
        setLoadPage(parseInt(Math.random() * 42));
    }

    return (
        <main className={style.main}>
            <section className={style.container}>
                <div className={style.cardPlayerDeck}>
                    {AIdeck.length > 0 && !loading ?
                        <CardAI key={"Ai_Card"} character={AIdeck[currentAiCard]} />
                    :
                        <p>loading...</p>
                    }
                </div>
                <div className={style.cardPlayerDeck}>
                    <div>
                        {deck.length > 0 && !loading ?
                        <Card key={"Player_Card"} character={deck[currentPlayerCard]} />
                        :
                            <p>loading...</p>
                        }
                    </div>
                    <div className={style.cardPlayerDeckActions}>
                        <CardButton onClick={()=>{
                            if (currentPlayerCard < deck.length-1){
                                setCurrentPlayerCard(value => value += 1);
                            }else {
                                setCurrentPlayerCard(0);
                            }
                        }} />
                    </div>
                </div>
            </section>
            <div className={style.pageButtons}>
                <button className="button" onClick={()=>{ randomDeck(); }}>Novo Deck</button>
                <Link href="/" className="button">Sair do jogo</Link>
            </div>
        </main>
    );
}