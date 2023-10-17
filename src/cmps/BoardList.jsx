import { Link } from "react-router-dom";
import { BoardPreview } from "./BoardPreview";
import { settingIsStarred } from "../store/actions/board.actions";
import { AddBoard } from "./AddBoard";
import { useEffect, useState } from "react";

export function BoardList({ boards, setStarredBoard, onLoadBoards }) {
    const [isStar, setIsStar] = useState('')

    // useEffect(() => {
    // }, [isStar])

    async function onStarredBoard(event, boardId) {
        event.preventDefault()
        try {
            const board = await settingIsStarred(boardId)
            setIsStar(board.isStarred)
            // onLoadBoards()
            if (board.isStarred) {
                setStarredBoard(prevBoard => [...prevBoard, board])
            } else {
                setStarredBoard(prevBoard => prevBoard.filter(b => b._id !== board._id))
            }
        } catch (err) {
            console.log('could not star the board', err)
        }
    }

    return (
        <>
            <ul className="board-list clean-list flex">
                {boards.map(board =>
                    <li style={{ backgroundImage: `url(${board.style.backgroundImage})`, backgroundColor: board.style.backgroundColor }} className="board-preview" key={board._id}>
                        <Link to={`/board/${board._id}`}>
                            <BoardPreview onStarredBoard={onStarredBoard} board={board} />
                        </Link>
                    </li>
                )}
            </ul>
        </>
    )
}
