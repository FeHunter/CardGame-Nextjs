import Link from "next/link";


export default function CardDetail ({params}){
    return (
        <div>
            <p>Carta ID: {params.id}</p>
            <Link href="/pages/cardPage" className={"button"}>Voltar</Link>
        </div>
    );
}