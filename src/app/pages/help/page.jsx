import Link from "next/link";

export default function Help (){
    return (
        <main>
            <h2>Tutorial para Jogadores: Guerra de Cartas</h2>

            <h3>Objetivo do Jogo</h3>
            <p>O objetivo do jogo é vencer a inteligência artificial (IA), ganhando todas as cartas do baralho.</p>

            <h3>Materiais Necessários</h3>
            <ul>
            <li>Um baralho padrão de 52 cartas.</li>
            </ul>

            <h3>Preparação</h3>
            <ol>
            <li><strong>Embaralhamento:</strong> O baralho é embaralhado completamente.</li>
            <li><strong>Distribuição de Cartas:</strong> Todas as cartas são distribuídas para o jogador.</li>
            </ol>

            <h3>Como Jogar</h3>
            <ol>
            <li><strong>Jogada do Jogador:</strong>
                <ul>
                <li>O jogador vira a carta do topo de sua pilha para iniciar a rodada.</li>
                </ul>
            </li>
            <li><strong>Jogada da IA:</strong>
                <ul>
                <li>A IA também vira a carta do topo de sua pilha simultaneamente.</li>
                </ul>
            </li>
            <li><strong>Comparação de Cartas:</strong>
                <ul>
                <li>A carta com maior valor ganha a rodada.</li>
                <li>O vencedor recolhe ambas as cartas e as coloca em sua própria pilha.</li>
                </ul>
            </li>
            <li><strong>Empate - Guerra:</strong>
                <ul>
                <li>Se as cartas viradas tiverem o mesmo valor, ocorre uma "guerra":</li>
                <li>Ambos colocam três cartas viradas para baixo e então uma quarta carta virada para cima.</li>
                <li>A carta virada para cima decide quem ganha todas as cartas jogadas na guerra.</li>
                </ul>
            </li>
            <li><strong>Continuação do Jogo:</strong>
                <ul>
                <li>O jogo continua com o jogador virando cartas e tentando ganhar todas as cartas da IA.</li>
                </ul>
            </li>
            <li><strong>Fim do Jogo:</strong>
                <ul>
                <li>O jogo termina quando o jogador ganha todas as 52 cartas da IA.</li>
                <li>Se o jogador ficar sem cartas durante uma guerra, ele perde o jogo.</li>
                </ul>
            </li>
            </ol>

            <h3>Diferenças Notáveis</h3>
            <ul>
            <li><strong>Jogo Solitário:</strong> O jogador compete contra a IA.</li>
            <li><strong>Estratégia contra a IA:</strong> Desenvolva estratégias para vencer a IA.</li>
            </ul>

            <h3>Exemplo de Jogada</h3>
            <ol>
            <li><strong>Rodada Inicial:</strong>
                <ul>
                <li>Jogador vira um 8.</li>
                <li>IA vira um 5.</li>
                <li>Jogador ganha a rodada e recolhe as duas cartas.</li>
                </ul>
            </li>
            <li><strong>Empate - Guerra:</strong>
                <ul>
                <li>Jogador vira um 6.</li>
                <li>IA vira um 6.</li>
                <li>É declarada uma guerra:</li>
                <li>Ambos colocam três cartas viradas para baixo e uma quarta carta virada para cima.</li>
                <li>Jogador vira um Valete.</li>
                <li>IA vira um 9.</li>
                <li>Jogador ganha a guerra e recolhe todas as cartas jogadas.</li>
                </ul>
            </li>
            </ol>
            <Link href="/" className={"button"}>Voltar</Link>
        </main>
    );
}