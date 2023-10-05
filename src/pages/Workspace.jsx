import { useEffect, useState } from "react"
import { loadBoards } from "../store/actions/board.actions"
import { useSelector } from "react-redux"
import { BoardList } from "../cmps/BoardList"

export function Workspace() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
//hey

    useEffect(() => {
        loadBoards()
    }, [])

    if (!boards || !boards.length) return <div>loading</div>
    return (
        <>
            <section className="workplace-container flex justify-center">
                <nav>
                    {/* <button> { } <span>Boards</span></button> */}
                    {/* <button> { } <span>Template</span></button> */}
                </nav>
                <section className="board">
                    <h2>Starred boards</h2>
                    <section className="board-bontainer">
                        <BoardList boards={boards} />
                    </section>
                    <h2>Recently viewed</h2>
                    <section className="board-bontainer">
                        <BoardList boards={boards} />
                    </section>
                </section>
            </section>
        </>
    )
}