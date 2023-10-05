import { Link } from "react-router-dom";
import { BoardPreview } from "./BoardPreview";
import { settingIsStarred } from "../store/actions/board.actions";

export function BoardList({ boards, setStarredBoard }) {

    async function onStarredBoard(event, boardId) {
        event.preventDefault()
        try {
            const board = await settingIsStarred(boardId)
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
        <section className="board-list">
            {boards.map(board =>
                <>
                    <ul style={board.style} className="board-preview" key={board._id}>
                        <Link to={`/board/${board._id}`}>
                            <BoardPreview onStarredBoard={onStarredBoard} board={board} />
                        </Link>
                    </ul>
                </>
            )}
        </section>
    )
} 
