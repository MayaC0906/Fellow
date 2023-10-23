import { Link } from "react-router-dom";
import { BoardPreview } from "./BoardPreview";

export function BoardList({ boards, onStarredBoard }) {

    console.log('list:', boards);

    return (
        <>
            <ul className="board-list clean-list flex">
                {boards && boards.map(board =>
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
