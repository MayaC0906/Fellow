import { Link } from "react-router-dom"
import { workspaceSvg } from "./Svgs"

export function BoardPreview({ board, onStarredBoard }) {
    const { title, _id } = board
    return (
        <li className="board-preview-detail">
            <section className="details">
                <h2>{title}</h2>
                <span onClick={(event) => onStarredBoard(event, _id)} className="star-svg">{workspaceSvg.star}</span>
            </section>
        </li>
    )
}