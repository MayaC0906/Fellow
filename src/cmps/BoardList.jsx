import { Link } from "react-router-dom";
import { BoardPreview } from "./BoardPreview";
import { settingIsStarred } from "../store/actions/board.actions";

export function BoardList({ boards, setStarredBoard, setIsStar }) {


    async function onStarredBoard(event, boardId) {
        event.preventDefault()
        try {
            const board = await settingIsStarred(boardId)
            if (board.isStarred) {
                setStarredBoard(prevBoard => [...prevBoard, board])
            } else {
                setStarredBoard(prevBoard => prevBoard.filter(b => b._id !== board._id))
            }
            setIsStar(board.isStarred)
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
