import style from '../../styles/cardAI.module.css';

export default function CardAI ({character, atk, def}){
    return (
        <div className={style.card}>
            <div className={style.cardInfoContainer}>
                <h2>{character.name}</h2>
                {/* <div className={style.cardStatusContainer}>
                    <span className={style.cardStatusIcon}>6</span>
                </div> */}
            </div>
            <img className={style.cardimage} src={character.image} />
            <div className={style.cardActionsContainer}>
                <p className={style.cardStatus}>{atk != undefined  ? `ATK: ${atk}` : '...'}</p>
                <p className={style.cardStatus}>{def != undefined  ? `ATK: ${def}` : '...'}</p>
            </div>
        </div>
    );
}