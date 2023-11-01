import { useEffect, useRef, useState } from "react"
import { loadBoards, updateBoard, updateBoards } from "../store/actions/board.actions"
import { useSelector } from "react-redux"
import { workspaceSvg } from "../cmps/Svgs"
import { AddBoard } from "../cmps/Board/AddBoard"
import { BoardList } from "../cmps/Board/BoardList"

export function Workspace() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isBoardAdded, setIsBoardAdded] = useState(false)
    const [addBoardPosition, setAddBoardPosition] = useState({ top: '', left: '' })
    const createBoardRef = useRef()
    const user = useSelector(storeState => storeState.userModule.user)
    const [count, setCount] = useState(10 - boards.length)
    const boardCount = useRef(10 - boards.length)



    useEffect(() => {
        onLoadBoars()
    }, [])

    async function onLoadBoars() {
        const boards = await loadBoards()
        // console.log('boars.length', boards.length);
        // boardCount.current = 10 - boards.length
        setCount(10 - boards.length)
    }

    let starredBoards = getStarredBoards()

    function getStarredBoards() {
        if (!boards || !boards.length) return
        return boards.filter(board => board.isStarred)
    }

    async function onStarredBoard(event, boardToChange) {
        event.preventDefault()
        boardToChange.isStarred = !boardToChange.isStarred
        try {
            await updateBoards(boards, boardToChange, user, 'starrd')
            getStarredBoards()
        } catch (err) {
            console.log('could not star the board', err)
        }
    }

    function onSetIsBoardAdded(ev) {
        getBounds(ev)
        setIsBoardAdded(!isBoardAdded)
    }

    function getBounds() {
        const addBoarddRect = createBoardRef.current.getBoundingClientRect()

        //DO NOT DELETE!!!!

        // if (addBoarddRect.y < 145) {
        //     setAddBoardPosition({
        //         top: addBoarddRect.top,
        //         left: addBoarddRect.left + 205
        //     })
        // }
        if (addBoarddRect.x > 590) {
            setAddBoardPosition({
                top: addBoarddRect.top,
                left: addBoarddRect.left + 200
            })
        }
        if (addBoarddRect.y > 540) {
            setAddBoardPosition({
                top: addBoarddRect.top - 345,
                left: addBoarddRect.left + 200
            })
        }
        else {
            setAddBoardPosition({
                top: addBoarddRect.top,
                left: addBoarddRect.left + 205
            })
        }
    }

    if (!boards || !boards.length) return (
        <div className="workspace-container">
            <section ref={createBoardRef} className="no-board-container" onClick={() => onSetIsBoardAdded()}>
                <h2 className="fs14">Create new board</h2>
                <h3 className="fs12">{count} remaining</h3>
                {/* <h3 className="fs12">{boardCount.current} remaining</h3> */}
            </section>
            {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} addBoardPosition={addBoardPosition} />}
        </div>
    )
    return (
        <section className="workspace-container flex">
            {/* <nav className="flex">
                <button className=""> {workspaceSvg.boards} <span>Boards</span></button>
                <button className=""> {workspaceSvg.template} <span>Template</span></button>
            </nav> */}
            <section className="boards flex">
                {starredBoards.length > 0 &&
                    <section className="boards-workspace-container">
                        <div className="container-title flex align-center">
                            <span className="svg flex align-center justify-center">{workspaceSvg.member}</span>
                            <span className="header-title">Starred boards</span>
                        </div>
                        <ul className="board-list clean-list flex">

                            <BoardList
                                boards={starredBoards}
                                onStarredBoard={onStarredBoard}
                            />
                        </ul>
                    </section>}
                <section className="boards-workspace-container">
                    <div className="container-title flex align-center">
                        <span className="svg flex align-center justify-center">{workspaceSvg.member}</span>
                        <span className="header-title">Your boards</span>
                    </div>
                    <ul className="board-list clean-list flex">
                        <BoardList
                            boards={boards}
                            onStarredBoard={onStarredBoard}
                        />
                        <section ref={createBoardRef} className={`boards-add ${count === 0 ? 'disable' : ''}`} onClick={count > 0 ? () => onSetIsBoardAdded() : null}>
                            <h2 className="fs14">Create new board</h2>
                            <h3 className="fs12">{count} remaining</h3>
                        </section>
                    </ul>
                    {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} addBoardPosition={addBoardPosition} />}
                </section>
            </section>
        </section>
    )
}
