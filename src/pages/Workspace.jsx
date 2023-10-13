import { useEffect, useState } from "react"
import { loadBoards } from "../store/actions/board.actions"
import { useSelector } from "react-redux"
import { BoardList } from "../cmps/BoardList"
import { workspaceSvg } from "../cmps/Svgs"
// import { } from "../cmps/TaskDetailsSideNav"
import { AddBoard } from "../cmps/AddBoard"

export function Workspace() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [starredBoard, setStarredBoard] = useState([])
    const [isBoardAdded, setIsBoardAdded] = useState(false)

    useEffect(() => {
        onLoadBoards()
    }, [])

    async function onLoadBoards() {
        try {
            const boards = await loadBoards()
            if (boards.length || boards) {
                boards.map(board => {
                    if (board.isStarred) {
                        setStarredBoard(prevBoard => [...prevBoard, board])
                    }
                })
            }
        } catch (err) {
            console.log('cannot load boards => ', err)
        }
    }

    console.log('isBoardAdded', isBoardAdded);

    if (!boards || !boards.length) return <div>loading</div>
    return (
        <>
            <section className="workspace-container flex justify-center">
                <nav className="flex">
                    <button className="flex"> {workspaceSvg.boards} <span>Boards</span></button>
                    <button className="flex"> {workspaceSvg.template} <span>Template</span></button>
                </nav>
                <section className="board">
                    {starredBoard.length > 0 && <section className="board-container">
                        <h2> {workspaceSvg.star} <span>Starred boards</span></h2>
                        <BoardList boards={starredBoard} setStarredBoard={setStarredBoard} />
                    </section>}
                    <section className="board-container">
                        <h2> {workspaceSvg.clock} <span>Recently viewed</span></h2>
                        <BoardList boards={boards} setStarredBoard={setStarredBoard} />
                        <section className="board-add" onClick={() => setIsBoardAdded(!isBoardAdded)}>Create new board</section>
                        {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} />}
                    </section>
                </section>
            </section>
        </>
    )
}