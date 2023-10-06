import { workspaceSvg } from "./Svgs"

export function BoardPreview({ board, onStarredBoard }) {
    const { title, _id } = board
    return (
        <li className="board-preview-detail">
            <section className="details">
                <h2>{title}</h2>
                <div onClick={(event) => onStarredBoard(event, _id)} className="star-svg">{workspaceSvg.star}</div>
            </section>
        </li>
    )
}