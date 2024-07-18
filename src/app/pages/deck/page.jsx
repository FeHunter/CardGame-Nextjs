"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from '../../styles/deck.module.css';
import Card from '../../components/card/card';

export default function Deack (){

    const [loading, setLoading] = useState(true);
    const [loadPage, setLoadPage] = useState(parseInt(Math.random() * 42));
    const [deck, setDeck] = useState([]);

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
            let newCards = [];
            let card;
            let usedCards = new Set();
            while (newCards.length < 3) {
                card = data.results[parseInt(Math.random() * data.results.length)];
                if (!usedCards.has(card)) {
                    usedCards.add(card);
                    newCards.push(card);
                }
            }
            setDeck(newCards);
            setLoading(false);
        })
        .catch(error => console.log(error));
    }

    function randomDeck (){
        setLoadPage(parseInt(Math.random() * 42));
    }

    return (
        <main>
            <button className="button" onClick={()=>{ randomDeck(); }}>Novo Deck</button>
            <div className={style.cardDeck}>
                {deck.length > 0 && !loading ?
                    deck.map((character, index) => {
                        return <Card key={`index_${index}`} character={character} />
                    })
                :
                    <p>loading...</p>
                }
            </div>
            <Link href="/" className="button">Sair do jogo</Link>
        </main>
    );
}