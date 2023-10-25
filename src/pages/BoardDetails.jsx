import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { loadBoard, loadBoards } from '../store/actions/board.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { boardService } from "../services/board.service.local.js";
import { SET_BOARD } from '../store/reducers/board.reducer.js'
import { BoardSidebar } from "../cmps/Board/BoardSidebar.jsx";
import { GroupHeader } from "../cmps/Group/GroupHeader.jsx";
import { GroupList } from "../cmps/Group/GroupList.jsx";
import { BoardMenu } from "../cmps/Board/BoardMenu.jsx";


export function BoardDetails() {
    const dispatch = useDispatch()
    const { boardId } = useParams()
    // const [boardToDisplay, setBoard] = useState([])
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isMenuOpen, setMenu] = useState(false)

    useEffect(() => {
        loadBoards()
        onLoadBoard()
    }, [boardId])


    async function onLoadBoard() {
        try {
            const board = await loadBoard(boardId)
            dispatch({ type: SET_BOARD, board })
            console.log('board loaded')
            // setBoard(board)
        } catch (err) {
            console.log('cant set board', err);
            throw err
        }
    }



    if (!Object.keys(board).length) return <div>loading</div>
    return (
        <>
            <BoardSidebar />
            <div className="board-details-container" style={{ backgroundImage: `url(${board.style.backgroundImage})`, backgroundColor: board.style.backgroundColor }} >
                <GroupHeader isMenuOpen={isMenuOpen} setMenu={setMenu} board={board} />
                <Outlet />
                <GroupList boardId={boardId} />
            </div>
            {isMenuOpen && <BoardMenu isMenuOpen={isMenuOpen} setMenu={setMenu} />}
        </>
    )
}

