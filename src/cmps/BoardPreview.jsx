import { workspaceSvg } from "./Svgs"

export function BoardPreview({ board, onStarredBoard }) {
    const { title, _id, isStarred } = board

    return (
        <>
            <section className="details flex">
                <h2 className="title">{title}</h2>
                {isStarred ? <span onClick={(event) => onStarredBoard(event, _id)} className="star-svg-full" >{workspaceSvg.fullStar}</span> : <span onClick={(event) => onStarredBoard(event, _id)} className="star-svg flex">{workspaceSvg.star}</span>}
                {/* <span onClick={(event) => onStarredBoard(event, _id)} className="star-svg flex">{workspaceSvg.star}</span> */}
            </section >
        </>
    )
}