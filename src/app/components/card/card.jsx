import style from '../../styles/card.module.css';

export default function Card ({character}){
    return (
        <div className={style.card}>
            <div className={style.cardInfoContainer}>
                <h2>{character.name}</h2>
                {/* <div className={style.cardStatusContainer}>
                    <span className={style.cardStatusIcon}>10</span>
                </div> */}
            </div>
            <img className={style.cardimage} src={character.image} />
            <div className={style.cardActionsContainer}>
                <button className='buttonPlayerCard'>ATK: 10</button>
                <button className='buttonPlayerCard'>DEF: 5</button>
            </div>
        </div>
    );
}