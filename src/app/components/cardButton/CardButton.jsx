import style from './CardButton.module.css';

export default function CardButton ({onClick}){
    return <div className={style.cardButton} onClick={onClick}> <p>?</p> </div> ;
}