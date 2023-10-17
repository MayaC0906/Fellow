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

    if (!boards || !boards.length) return <div>loading</div>
    return (
        <section className="workspace-container flex">
            {/* <nav className="flex">
                    <button className=""> {workspaceSvg.boards} <span>Boards</span></button>
                    <button className=""> {workspaceSvg.template} <span>Template</span></button>
                </nav> */}
            <section className="boards flex">
                {starredBoard.length > 0 &&
                    <section className="boards-workspace-container">
                        <div className="flex align-center">
                            <span className="svg flex align-center justify-center">{workspaceSvg.star}</span>
                            <span className="title">Starred boards</span>
                        </div>
                        <BoardList onLoadBoards={onLoadBoards} boards={starredBoard} setStarredBoard={setStarredBoard} />
                    </section>}
                <section className="boards-workspace-container">
                    <div className="flex align-center">
                        <span className="svg flex align-center justify-center">{workspaceSvg.clock}</span>
                        <span className="title">Recently viewed</span>
                    </div>
                    <BoardList onLoadBoards={onLoadBoards} setIsBoardAdded={setIsBoardAdded} isBoardAdded={isBoardAdded} boards={boards} setStarredBoard={setStarredBoard} />
                    <section className="boards-add flex align-center justify-center" onClick={() => setIsBoardAdded(!isBoardAdded)}>Create new board</section>
                    {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} />}
                </section>
            </section>
        </section>
    )
}
