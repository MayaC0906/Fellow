import { useEffect, useState } from "react";
import { groupHeaderSvg, workspaceSvg } from "../Svgs";
import { updateBoard } from "../../store/actions/board.actions";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { ShareBoard } from "../Board/ShareBoard";
import { OurSiri } from "../OurSiri";
import { Dashboard } from "../Dashboard";

export function GroupHeader({ isMenuOpen, setMenu, setIsFiltersOpen, isFiltersOpen }) {
    const { boardId } = useParams()
    const user = useSelector((storeState) => storeState.userModule.user)
    const boardFromState = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [board, onSetBoard] = useState({})
    const [isBoardStarred, setIsBoardStarred] = useState(null)
    const [content, setContent] = useState('')
    const [isOpenShareBoard, setIsOpenShareBoard] = useState(false)
    const [isSiriOpen, setSiriOpen] = useState(false)
    const [isPhoneDisplay, setIsPhoneDisplay] = useState(false)
    const [isDashboardOpen, setDashBoardOpen] = useState(false)

    let zIndexCount = 10

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    function handleResize() {
        const screenWidth = window.innerWidth
        if (screenWidth > 980) {
            setIsPhoneDisplay(false)
        }
        else setIsPhoneDisplay(true)
    }

    useEffect(() => {
        onLoadBoard()
    }, [boardId, board])

    async function onLoadBoard() {
        const boardToFind = boards.find(board => board._id === boardId)
        onSetBoard(boardToFind)
        setIsBoardStarred(boardToFind.isStarred)
        setContent(boardToFind.title)
    }

    async function onEditBoardTitle() {
        let value = event.target.textContent
        board.title = value
        try {
            const txt = `changed this board title from ${board.title} to ${value}.`
            await updateBoard(board, user, txt)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async function onToggleBoardStar() {
        board.isStarred = !board.isStarred
        try {
            const txt = `${board.isStarred ? 'starred' : 'unstarred'} this board.`
            await updateBoard(board, user, txt)
            setIsBoardStarred(board.isStarred)
        } catch (err) {
            console.log(`Could'nt change isStarred`, err)
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
                        contentEditable={true}>{content}</div>
                    {!isBoardStarred && (<button className={isBlackOrWhite} onClick={onToggleBoardStar}>{workspaceSvg.star}</button>)}
                    {isBoardStarred && (<button className={isBlackOrWhite} onClick={onToggleBoardStar}>{groupHeaderSvg.fullStar}</button>)}
                </section>

                <section className="group-header">
                    {!isPhoneDisplay && <button className={`btn ${isBlackOrWhite}`} onClick={() => setDashBoardOpen(!isDashboardOpen)}>{groupHeaderSvg.dashboard} <span className="dashboard">Dashboard</span></button>}
                    <button className={`${isBlackOrWhite} ` + (isPhoneDisplay ? '' : 'svg btn')} onClick={() => setIsFiltersOpen(!isFiltersOpen)}>{groupHeaderSvg.filter} <span className="filters">{isPhoneDisplay ? '' : 'Filters'}</span></button>
                    <button className={`${isBlackOrWhite} ` + (isPhoneDisplay ? '' : 'svg btn')} onClick={() => setSiriOpen(!isSiriOpen)} >{groupHeaderSvg.speaker} <span className="siri">{isPhoneDisplay ? '' : 'Siri'}</span></button>

                    <span className="separate-line"></span>
                    <section className="group-header img">
                        {!isPhoneDisplay &&
                            boardFromState.members.map(member => (
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
            {isDashboardOpen && <Dashboard board={board} setDashBoardOpen={setDashBoardOpen} isDashboardOpen={isDashboardOpen} />}
        </>
    )
}