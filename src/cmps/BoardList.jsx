import { Link } from "react-router-dom";
import { BoardPreview } from "./BoardPreview";
import { settingIsStarred } from "../store/actions/board.actions";

export function BoardList({ boards }) {

    function onStarredBoard(boardId) {
        settingIsStarred(boardId)
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
