import Link from "next/link";

export default function CardPage (){
    return (
        <div>
            <p>This is the card Page!</p>
            <Link href="/pages/cardPage/24" className={"button"}>Detalhes da carta</Link>
            <Link href="/" className={"button"}>Voltar ao menu</Link>
        </div>
    );
}