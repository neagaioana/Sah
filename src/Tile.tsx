import "./Tile.css";

interface Properties {
    image?: string;
    number: number;
}

export default function Tile({number, image}: Properties) {
    if (number % 2 === 0) {
        return (
            <div className="dark-square">
                {image && <div style={{backgroundImage: `url(${image})`}} className="piece"></div>}
            </div>
        );
    } else {
        return (
            <div className="light-square">
                {image && <div style={{backgroundImage: `url(${image})`}} className="piece"></div>}
            </div>
        );
    }
}