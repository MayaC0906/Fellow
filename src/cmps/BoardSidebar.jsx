import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { sideBar } from "./Svgs";
import { Link, useParams, useLocation } from "react-router-dom";
import { Brightness1 } from "@mui/icons-material";
import { lighten } from 'polished';

export function BoardSidebar() {
  const [isSidebarExpand, setSidebarExpand] = useState(false)
  const [activeBoardId, setActiveBoardId] = useState(null)
  const location = useLocation()
  const { boardId } = useParams()

  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.board)

  function handleBoardItemClick (boardId) {
    setActiveBoardId(boardId)
  }

  useEffect(() => {
    if (boardId) {
      setActiveBoardId(boardId);
    }
  }, [boardId])

  return (
    <section
      className='board-sidebar'
      style={{
        backgroundColor: `${lighten(0.02, `rgba(${board.style.dominantColor.rgb}, 0.9)`)}`
      }}
    >
      <ul className={`${isSidebarExpand ? 'expand' : 'unexpand'}`}>
        {!isSidebarExpand ? (
          <div
            className='expand-btn'
            style={{
              backgroundColor: `${lighten(0.02, `rgba(${board.style.dominantColor.rgb}, 0.9)`)}`
            }}
            onClick={() => setSidebarExpand(!isSidebarExpand)}
          >
            <span>{sideBar.rightArr}</span>
          </div>
        ) : (
          <li>
            <header>
              <span className="logo">F</span>
              <div>
                <h3>Fellow's workspace</h3>
                <p>Free</p>
              </div>
              <button
                className='unexpand-btn clean-btn'
                onClick={() => setSidebarExpand(!isSidebarExpand)}
              >
                <span>{sideBar.leftArr}</span>
              </button>
            </header>
            <div className="upper-section">
              <section className="boards" key={board._id}>
                <div className="svg">{sideBar.boards}</div>
                <span><Link to={`/workspace`}>Boards</Link></span>
              </section>
              <section>
                <div className="svg">{sideBar.members}</div>
                <span>Members</span>
              </section>
              <section>
                <div className="svg">{sideBar.workspace}</div>
                <span>Workspace settings</span>
              </section>
            </div>
          </li>
        )}

        {isSidebarExpand && (
          <section className="user-boards ">
            <header>Your Boards</header>
            {boards.map((boardItem) => (
              <section
                key={boardItem._id}
                className={`${activeBoardId === boardItem._id ? 'active' : ''}`} 
                onClick={() => handleBoardItemClick(boardItem._id)}
              >
                <img src={boardItem.style.backgroundImage} alt="" />
                <Link to={`/board/${boardItem._id}`}>{boardItem.title}</Link>
              </section>
            ))}
          </section>
        )}
      </ul>
    </section>
  );
}
