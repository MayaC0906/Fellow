import { Link } from "react-router-dom"
import { workspaceSvg } from "./Svgs"

export function BoardPreview({ board, onStarredBoard }) {
    const { title } = board
    return (
        <li className="board-preview-detail">
            <section className="details">
                <h2>{title}</h2>
                {/* <button onClick={() => onStarredBoard(board._id)}>{board.isStarred ? '⭐' : ''}</button> */}
                <div className="star-svg">{workspaceSvg.star}</div>
            </section>
        </li>
    )
}