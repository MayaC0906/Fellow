import { useEffect, useState } from "react";
import { appHeaderSvg, groupHeaderSvg, workspaceSvg } from "../Svgs";
import { useSelector } from "react-redux";
import { updateBoard } from "../../store/actions/board.actions";
import { BoardMenu } from "../Board/BoardMenu.jsx"

export function GroupHeader({ isMenuOpen, setMenu, board }) {
    const [boardTitle, setBoardTitle] = useState('')

    useEffect(() => {
        setBoardTitle(board.title)
    }, [board.title])

    function handleIputLength(event) {
        let value = event.target.value
        setBoardTitle(value)
    }

    async function onEditBoardTitle({ }) {
        board.title = boardTitle
        try {
            await updateBoard(board)
        } catch (err) {
            console.log(err);
            throw err
        }
    }


    const { isBright } = board.style

    return (
        <header className="group-header bgc">
            <section className="visibility">
                <section className="header-title">
                    <input
                        type="text"
                        onChange={handleIputLength}
                        value={boardTitle}
                        style={{ width: `${boardTitle.scrollWidth}px` }}
                        onBlur={onEditBoardTitle}
                    />
                </section>
                <section className="group-visbility group-header">
                    <button className="group-header-btn svg star">{workspaceSvg.star}</button>
                    <button className="group-header-btn svg members">{groupHeaderSvg.members}<span>Workspace visible</span></button>
                    <button className={`group-header-btn svg bars ${isBright ? 'brightColor' : 'darkColor'}`}>{groupHeaderSvg.bars} <span>Board</span></button>
                    <button className="group-header-btn svg arrowdown">{appHeaderSvg.arrowDown}</button>
                </section>
            </section>

            <section className="group-header group-editing">
                <button className="group-header-btn svg powerUp">{groupHeaderSvg.rocket} <span>Power-Ups</span></button>
                <button className="group-header-btn svg dashboard">{groupHeaderSvg.dashboard} <span>Dashboard</span></button>
                <button className="group-header-btn svg filter">{groupHeaderSvg.filter} <span>Filter</span></button> <span className="separate-line">|</span>
                <section className="group-header img">
                    <img className="member-img" src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg" alt="" />
                    <img className="member-img" src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg" alt="" />
                    <img className="member-img" src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg" alt="" />
                    <button className={`group-header-btn svg additional ${isBright ? 'brightColor' : 'darkColor'}`}>{groupHeaderSvg.addmember} <span>Share</span></button>
                    {!isMenuOpen ? <button onClick={() => setMenu(!isMenuOpen)} className="group-header-btn svg dots">{groupHeaderSvg.threeDots}</button> : ''}
                </section>
            </section>
        </header>
    )
}