import { useSelector } from "react-redux";
import { workspaceSvg } from "../Svgs";

export function AboutBoard() {

    const board = useSelector(storeState => storeState.boardModule.board)
    const { members } = board
    let zIndexCount = 1

    function onDisplayMember() {
        alert('will be added soon')
    }

    return (
        <div className="about-board">
            <section className="about-board-title align-center flex">
                <span className="align-center flex">{workspaceSvg.member}</span>
                <p>Board admins</p>
            </section>
            <section className="about-board-members flex">
                {members.map(member => (
                    <section className="member-img-display flex align-center">
                        <img onClick={onDisplayMember} className='member-img' src={member.imgUrl} alt="" key={member._id} style={{ zIndex: zIndexCount++, width: 30, height: 30 }} />
                        <span></span>
                    </section>
                ))}
            </section>
            <hr />
        </div>
    )
}