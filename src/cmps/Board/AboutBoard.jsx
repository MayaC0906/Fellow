import { useSelector } from "react-redux";
import { taskSvg, workspaceSvg } from "../Svgs";

export function AboutBoard() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const { members } = board
    let zIndexCount = 1

    return (
        <div className="about-board">
            <div>
                <section className="about-board-title align-center flex">
                    <span className="align-center flex">{workspaceSvg.member}</span>
                    <p>Board admin</p>
                </section>
                <section className="about-board-members flex">
                    {members.map(member => (
                        <section className="member-img-display flex align-center">
                            <img className='member-img' src={member.imgUrl} alt="" key={member._id} style={{ zIndex: zIndexCount++, width: 30, height: 30 }} />
                            <span></span>
                        </section>
                    ))}
                </section>
            </div>
            <section className="about-board-description">
                <div className="about-board-title align-center flex">
                    <span className="align-center flex">{taskSvg.description}</span>
                    <p>Description</p>
                </div>
                <p className="description-area ">
                    Add a description to let your teammates know what this board is used for. You’ll get bonus points if you add instructions for how to collaborate!
                </p>
            </section>
            <hr />
        </div>
    )
}