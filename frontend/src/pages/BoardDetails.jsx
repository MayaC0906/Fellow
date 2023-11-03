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
import { loaderSvg } from "../cmps/Svgs.jsx";
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_UPDATE_BOARD } from "../services/socket.service.js";
import { getActionUpdateBoard } from "../store/actions/board.actions.js";

export function BoardDetails() {
    const dispatch = useDispatch()
    const { boardId } = useParams()
    // const [boardToDisplay, setBoard] = useState([])
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isMenuOpen, setMenu] = useState(false)
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)


    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)


        onLoadBoard()
        loadBoards()

    }, [boardId])



    async function onLoadBoard() {
        try {
            await loadBoard(boardId)
            console.log('board loaded')
            // setBoard(board)
        } catch (err) {
            console.log('cant set board', err);
            throw err
        }
    }


    if (!Object.keys(board).length) return <div className="loader board"><div>{loaderSvg.loader}</div></div>
    return (
        <>
            <BoardSidebar />
            <div className="board-details-container" style={{ backgroundImage: `url(${board.style.backgroundImage})`, backgroundColor: board.style.backgroundColor }} >
                <GroupHeader setIsFiltersOpen={setIsFiltersOpen} isFiltersOpen={isFiltersOpen} onLoadBoard={onLoadBoard} isMenuOpen={isMenuOpen} setMenu={setMenu} boardId={boardId} />
                <Outlet />
                <GroupList setIsFiltersOpen={setIsFiltersOpen} isFiltersOpen={isFiltersOpen} boardId={boardId} />
            </div>
            {isMenuOpen && <BoardMenu isMenuOpen={isMenuOpen} setMenu={setMenu} />}
        </>
    )
}

