import Tile from "./Tile";
import "./Chessboard.css";

const rows = 8;
const cols = 8;

interface Piece {
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[] = [];

for (let k = 0; k < 2; k++) {
    let type;
    if (k === 0) {
        type = "negru";
    } else {
        type = "alb";
    }

    let y;
    if (k === 0) {
        y = 7;
    } else {
        y = 0;
    }

    pieces.push({image: `Piese/rook_${type}.png`, x: 0, y});
    pieces.push({image: `Piese/rook_${type}.png`, x: 7, y});
    pieces.push({image: `Piese/knight_${type}.png`, x: 1, y});
    pieces.push({image: `Piese/knight_${type}.png`, x: 6, y});
    pieces.push({image: `Piese/bishop_${type}.png`, x: 2, y});
    pieces.push({image: `Piese/bishop_${type}.png`, x: 5, y});
    pieces.push({image: `Piese/queen_${type}.png`, x: 3, y});
    pieces.push({image: `Piese/king_${type}.png`, x: 4, y});

    let pawn;
    if (k === 0) {
        pawn = 6;
    } else {
        pawn = 1;
    }
    for (let i = 0; i < 8; i++) {
        pieces.push({image: `Piese/pawn_${type}.png`, x: i, y: pawn});
    }
}

let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent) {
    const pieceElement = e.target as HTMLElement;
    if (pieceElement.classList.contains("piece")) {
        const offsetX = e.clientX - 50;
        const offsetY = e.clientY - 50;
        pieceElement.style.position = "absolute";
        pieceElement.style.left = `${offsetX}px`;
        pieceElement.style.top = `${offsetY}px`;
        activePiece = pieceElement;
    }
}

function movePiece(e: React.MouseEvent) {
    if (activePiece) {
        const chessboard = e.currentTarget as HTMLElement;
        const boardLeft = chessboard.offsetLeft - 25;
        const boardTop = chessboard.offsetTop - 25;
        const boardRight = boardLeft + chessboard.clientWidth - 50;
        const boardBottom = boardTop + chessboard.clientHeight - 50;
        const mouseX = e.clientX - 50;
        const mouseY = e.clientY - 50;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${Math.min(Math.max(mouseX, boardLeft), boardRight)}px`;
        activePiece.style.top = `${Math.min(Math.max(mouseY, boardTop), boardBottom)}px`;
    }
}

function dropPiece() {
    activePiece = null;
}

export default function Chessboard() {
    let board = [];
    for (let j = 7; j >= 0; j--) {
        for (let i = 0; i < cols; i++) {
            const numberOfTile = i + j + 2;
            let image = undefined;
            pieces.forEach((k) => {
                if (k.x === i && k.y === j) {
                    image = k.image;
                }
            });
            board.push(<Tile key={`${j},${i}`} image={image} number={numberOfTile}/>);
        }
    }
    return (
        <div
            onMouseMove={(e) => movePiece(e)}
            onMouseDown={(e) => grabPiece(e)}
            onMouseUp={dropPiece}
            id="chessboard"
        >
            {board}
        </div>
    );
}
