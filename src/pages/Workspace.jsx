import { useEffect, useState } from "react"
import { loadBoards } from "../store/actions/board.actions"
import { useSelector } from "react-redux"
import { BoardList } from "../cmps/BoardList"

export function Workspace() {
    const boards = useSelector(storeState => storeState.boardModule.boards)


    useEffect(() => {
        loadBoards()
    }, [])

    if (!boards || !boards.length) return <div>loading</div>
    return (
        <section className="board">
            <h2>Recently viewed</h2>
            <section className="board-bontainer">
                <BoardList boards={boards} />
            </section>
        </section>
    )
}