import { useEffect, useState } from 'react';
import style from '../../styles/BattleScreem.module.css'
import Card from '../card/card';
import CardAI from '../card/cardAI';

export default function BattleScreem ({playerCard, playerAtk, playerDef, enemyCard, enemyAtk, enemyDef, endBattle}){

    const [battleStatus, setBattleStatus] = useState("...");

    useEffect(()=>{
        checkBattleStatus();
    },[]);

    function checkBattleStatus (){
        if (playerAtk > enemyDef){
            setBattleStatus("You Win!");
        }else {
            setBattleStatus("You Lose!");
        }
    }

    return (
        <section className={style.battleContainer}>
            <section className={style.battleDesk}>
                <div className={style.cardContainer}>
                    <CardAI
                        key={"Ai_Card_OnBattle"}
                        character={enemyCard}
                        atk={enemyAtk}
                        def={enemyDef}
                    />
                </div>
                <div className={style.infoContainer}>
                    <p>{battleStatus}</p>
                </div>
                <div className={style.cardContainer}>
                    <Card
                        key={"Player_Card_OnBattle"}
                        character={playerCard}
                        atk={playerAtk}
                        def={playerDef}
                    />
                </div>
                <div className={style.blockInteraction}></div>
                <button className="button" onClick={endBattle}>New Battle!</button>
            </section>
        </section>
    );
}