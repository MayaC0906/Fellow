import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { updateBoard } from "../../store/actions/board.actions";

import { ShareBoard } from "../Board/ShareBoard";
import { OurSiri } from "../OurSiri";
import { Dashboard } from "../Dashboard";
import { ChatApp } from '../../pages/Chat'

import { Chat } from "@mui/icons-material";
import { groupHeaderSvg, workspaceSvg } from "../Svgs";

export function GroupHeader({ isMenuOpen, setMenu, setIsFiltersOpen, isFiltersOpen }) {

    const board = useSelector(storeState => storeState.boardModule.board)
    const user = useSelector((storeState) => storeState.userModule.user)

    const membersToDisplay = board.members.filter(boardMembers => boardMembers.username !== 'Guest')

    const [isBoardStarred, setIsBoardStarred] = useState(board.isStarred)
    const [isOpenShareBoard, setIsOpenShareBoard] = useState(false)
    const [isSiriOpen, setSiriOpen] = useState(false)
    const [isPhoneDisplay, setIsPhoneDisplay] = useState(false)
    const [isDashboardOpen, setDashBoardOpen] = useState(false)
    const [isChatOpen, setChatOpen] = useState(false)

    let zIndexCount = 10

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    function handleResize() {
        const screenWidth = window.innerWidth
        if (screenWidth > 980) {
            setIsPhoneDisplay(false)
        }
        else setIsPhoneDisplay(true)
    }

    async function onEditBoardTitle(event) {
        let value = event.target.textContent
        const txt = `renamed this board from (${board.title}).`
        const newBoard = { ...board, title: value }
        try {
            await updateBoard(newBoard, user, txt)
        } catch (err) {
            console.error('Failed to update board title', err)
            throw err
        }
    }

    async function onToggleBoardStar() {
        const newBoard = { ...board, isStarred: !board.isStarred }
        try {
            const txt = `${newBoard.isStarred ? 'starred' : 'unstarred'} this board.`
            await updateBoard(newBoard, user, txt)
            setIsBoardStarred(newBoard.isStarred)
        } catch (err) {
            console.error(`Could'nt change isStarred`, err)
        }
    }

    if (!board || !board._id) return <div></div>

    const { isBright } = board.style
    const isBlackOrWhite = isBright ? 'brightColor' : 'darkColor'

    return (
        <>
            <header className="group-header container">
                <section className="board-edit flex">
                    <div tabIndex="0" onBlur={onEditBoardTitle}
                        contentEditable={true}>{board.title}</div>
                    {!isBoardStarred && (<button className={`${isBlackOrWhite} btn`} onClick={onToggleBoardStar}>{workspaceSvg.star}</button>)}
                    {isBoardStarred && (<button className={`${isBlackOrWhite} btn`} onClick={onToggleBoardStar}>{groupHeaderSvg.fullStar}</button>)}
                </section>

                <section className="group-header">
                    {!isPhoneDisplay && <button className={`btn ${isBlackOrWhite}`} onClick={() => setDashBoardOpen(!isDashboardOpen)}>{groupHeaderSvg.dashboard} <span className="dashboard">Dashboard</span></button>}
                    <button className={`${isBlackOrWhite} ` + (isPhoneDisplay ? '' : 'svg btn')} onClick={() => setIsFiltersOpen(!isFiltersOpen)}>{groupHeaderSvg.filter} <span className="filters">{isPhoneDisplay ? '' : 'Filters'}</span></button>
                    <button className={`${isBlackOrWhite} ` + (isPhoneDisplay ? '' : 'svg btn')} onClick={() => setSiriOpen(!isSiriOpen)} >{groupHeaderSvg.speaker} <span className="siri">{isPhoneDisplay ? '' : 'Assistant'}</span></button>
                    <button className={`${isBlackOrWhite} ` + (isPhoneDisplay ? '' : 'svg btn')} onClick={() => setChatOpen(!isChatOpen)} >{<Chat />} <span className="siri">{isPhoneDisplay ? '' : 'Chat'}</span></button>
                    <span className="separate-line"></span>
                    <section className="group-header img">
                        {!isPhoneDisplay &&
                            membersToDisplay.map(member => (
                                <section className="member-img-container flex align-center">
                                    <img className={`member-img ${isBlackOrWhite}`} src={member.imgUrl} alt="" key={member._id} style={{ zIndex: zIndexCount-- }} />
                                    <span></span>
                                </section>
                            ))
                        }
                        <button className={`${isBlackOrWhite} share ` + (isPhoneDisplay ? '' : 'svg btn')} onClick={() => setIsOpenShareBoard(!isOpenShareBoard)}>{groupHeaderSvg.addmember} <span>{isPhoneDisplay ? '' : 'Share'}</span></button>
                        {isOpenShareBoard && <ShareBoard setIsOpenShareBoard={setIsOpenShareBoard} />}
                        {!isMenuOpen ? <button onClick={() => setMenu(!isMenuOpen)} className="group-header-btn svg dots">{groupHeaderSvg.threeDots}</button> : ''} </section>
                </section>
            </header>
            {isSiriOpen && <OurSiri isSiriOpen={isSiriOpen} setSiriOpen={setSiriOpen} />}
            {isDashboardOpen && <Dashboard setDashBoardOpen={setDashBoardOpen} />}
            {isChatOpen && <ChatApp setChatOpen={setChatOpen} isChatOpen={isChatOpen} />}
        </>
    )
}