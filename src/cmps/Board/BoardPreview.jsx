import { workspaceSvg } from "../Svgs"

export function BoardPreview({ board, onStarredBoard }) {
    const { title, isStarred, style } = board
    console.log(style.isBright);

    // dark :rgba(0, 0, 0, 0.15)
    // bright:  rgba(0, 0, 0, 0.3);

    return (
        <>
            <section className={`details ${style.isBright} flex`}>
                <h2 className="title">{title}</h2>
                {isStarred ? <span onClick={(event) => onStarredBoard(event, board)} className="star-svg-full" >{workspaceSvg.fullStar}</span> : <span onClick={(event) => onStarredBoard(event, board)} className='star-svg flex'>{workspaceSvg.star}</span>}
            </section >
        </>
    )
}