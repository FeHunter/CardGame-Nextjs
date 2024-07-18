"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Deack (){

    const [characters, setCharacters] = useState([{name: ''}]);

    useEffect(()=>{
        loadCharacters();
    },[]);
    
    async function loadCharacters (){
        await fetch("https://rickandmortyapi.com/api/character")
        .then(res => res.json())
        .then(data => {
            setCharacters(data.results);
            // console.log(data.results);
        })
        .catch(error => console.log(error.message()));
    }

    return (
        <div>
            <p>Gameplay</p>
            <button onClick={()=>{loadCharacters()}}>Load characters</button>
            <ul>
                {characters.length > 0 ?
                    characters.map((character, index) => {
                        return <li key={`index_${index}`}>{character.name}</li>
                    })
                :
                <p>loading...</p>
                }
            </ul>
            <Link href="/" className="button">Sair do jogo</Link>
        </div>
    );
}