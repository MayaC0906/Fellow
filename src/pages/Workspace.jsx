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


    useEffect(() => {
        loadBoards()
    }, [])

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

    function getBounds(ev) {
        const addBoarddRect = createBoardRef.current.getBoundingClientRect()
        setAddBoardPosition({
            top: addBoarddRect.top - 179,
            left: addBoarddRect.left + 205
        })
    }




    if (!boards || !boards.length) return (
        <>
            <section className="boards-add flex align-center justify-center" onClick={() => setIsBoardAdded(!isBoardAdded)}>Create new board</section>
            {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} />}
        </>
    )
    console.log('addBoardPosition', addBoardPosition);
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
                        <section ref={createBoardRef} className="boards-add flex align-center justify-center" onClick={(ev) => onSetIsBoardAdded(ev)}>Create new board
                        </section>
                    </ul>
                    {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} addBoardPosition={addBoardPosition} />}
                </section>
            </section>
        </section>
    )
}
