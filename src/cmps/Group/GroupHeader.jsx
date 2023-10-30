import { useEffect, useState } from "react";
import { groupHeaderSvg, workspaceSvg } from "../Svgs";
import { updateBoard } from "../../store/actions/board.actions";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { ShareBoard } from "../Board/ShareBoard";
import { OurSiri } from "../OurSiri";

export function GroupHeader({ isMenuOpen, setMenu }) {
    const { boardId } = useParams()
    const user = useSelector((storeState) => storeState.userModule.user)
    const boardFromState = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [board, onSetBoard] = useState({})
    const [isBoardStarred, setIsBoardStarred] = useState(null)
    const [content, setContent] = useState('')
    const [isOpenShareBoard, setIsOpenShareBoard] = useState(false)
    const [isSiriOpen, setSiriOpen] = useState(false)
    let zIndexCount = 10
    useEffect(() => {
        console.log('use effect in groupheader');
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
            console.log(err);
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
            console.log(`Could'nt change isStarred`, err);
        }
    }

    if (!board || !board._id) return <div></div>

    const { isBright } = board.style
    const isBlackOrWhite = isBright ? 'brightColor' : 'darkColor'

    console.log('board from groupheader:', board);

    // IMPORTANT: everything that is in comment might be added in the future // 
    return (
        <>
            <header className="group-header container">
                <section className="board-edit flex">
                    <div tabIndex="0" onBlur={onEditBoardTitle}
                        contentEditable={true}>{content}</div>
                    {/* <section className="group-visbility group-header"> */}
                    {!isBoardStarred && (<button className={isBlackOrWhite} onClick={onToggleBoardStar}>{workspaceSvg.star}</button>)}
                    {isBoardStarred && (<button className={isBlackOrWhite} onClick={onToggleBoardStar}>{groupHeaderSvg.fullStar}</button>)}
                    {/* <button className="group-header-btn svg members">{groupHeaderSvg.members}<span>Workspace visible</span></button> */}
                    {/* <button className={`group-header-btn svg bars ${isBright ? 'brightColor' : 'darkColor'}`}>{groupHeaderSvg.bars} <span>Board</span></button> */}
                    {/* <button className="group-header-btn svg arrowdown">{appHeaderSvg.arrowDown}</button> */}
                    {/* </section> */}
                </section>

                <section className="group-header">
                    {/* <button className="group-header-btn svg powerUp">{groupHeaderSvg.rocket} <span>Power-Ups</span></button> */}
                    <button className={`btn ${isBlackOrWhite}`} onClick={() => alert('Will be added soon')}>{groupHeaderSvg.dashboard} <span className="dashboard">Dashboard</span></button>
                    <button className={`btn svg ${isBlackOrWhite}`} onClick={() => alert('Will be added soon')}>{groupHeaderSvg.filter} <span className="filters">Filters</span></button>
                    <button className={`btn ${isBlackOrWhite}`} onClick={() => setSiriOpen(!isSiriOpen)} >Siri</button>

                    <span className="separate-line"></span>
                    <section className="group-header img">
                        {console.log(board.members)}
                        {boardFromState.members.map(member => (
                            <section className="member-img-container flex align-center">
                                <img className={`member-img ${isBlackOrWhite}`} src={member.imgUrl} alt="" key={member._id} style={{ zIndex: zIndexCount-- }} />
                                <span></span>
                            </section>
                        ))}
                        <button className={`btn svg ${isBlackOrWhite} share`} onClick={() => setIsOpenShareBoard(!isOpenShareBoard)}>{groupHeaderSvg.addmember} <span>Share</span></button>
                        {isOpenShareBoard && <ShareBoard setIsOpenShareBoard={setIsOpenShareBoard} />}
                        {!isMenuOpen ? <button onClick={() => setMenu(!isMenuOpen)} className="group-header-btn svg dots">{groupHeaderSvg.threeDots}</button> : ''} </section>
                </section>
            </header>
            {isSiriOpen && <OurSiri isSiriOpen={isSiriOpen} setSiriOpen={setSiriOpen} />}
        </>
    )
}
