"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from '../../styles/deck.module.css';
import Card from '../../components/card/card';
import CardAI from '../../components/card/cardAI';

export default function Deack (){

    const [loading, setLoading] = useState(true);
    const [loadPage, setLoadPage] = useState(parseInt(Math.random() * 42));
    const [deck, setDeck] = useState([]);
    const [AIdeck, setAIDeck] = useState([]);

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
            while (player_newCards.length < 3) {
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
            while (ai_newCards.length < 3) {
                ai_card = data.results[parseInt(Math.random() * data.results.length)];
                if (!usedCards.has(ai_card)) {
                    usedCards.add(ai_card);
                    ai_newCards.push(ai_card);
                }
            }
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
            <button className="button" onClick={()=>{ randomDeck(); }}>Novo Deck</button>
            <section className={style.container}>
                <div className={style.cardPlayerDeck}>
                    {AIdeck.length > 0 && !loading ?
                        AIdeck.map((character, index) => {
                            return <CardAI key={`index_${index}`} character={character} />
                        })
                    :
                        <p>loading...</p>
                    }
                </div>
                <div className={style.cardPlayerDeck}>
                    {deck.length > 0 && !loading ?
                        deck.map((character, index) => {
                            return <Card key={`index_${index}`} character={character} />
                        })
                    :
                        <p>loading...</p>
                    }
                </div>
            </section>
            <Link href="/" className="button">Sair do jogo</Link>
        </main>
    );
}