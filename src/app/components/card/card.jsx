import style from '../../styles/card.module.css';

export default function Card ({character, atk, def, onClick}){
    return (
        <div className={style.card}>
            <div className={style.cardInfoContainer}>
                <h2>{character?.name}</h2>
            </div>
            <img className={style.cardimage} src={character?.image} />
            <div className={style.cardActionsContainer}>
                <button className='buttonPlayerCard' onClick={onClick}> {atk != undefined  ? `ATK: ${atk}` : '...'} </button>
                {/* <button className='buttonPlayerCard' onClick={onClick}> {def != undefined  ? `DEF: ${def}` : '...'} </button> */}
            </div>
        </div>
    );
}