import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { boardMenu, checkList, sideBar } from "../Svgs";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Block, Brightness1 } from "@mui/icons-material";
import { lighten } from 'polished';
import { AddBoard } from '../Board/AddBoard'
import { removeBoard } from "../../store/actions/board.actions";

export function BoardSidebar() {
  const [isSidebarExpand, setSidebarExpand] = useState(false)
  const [activeBoardId, setActiveBoardId] = useState(null)
  const { boardId } = useParams()
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortedBoards, setSetSortedBoards] = useState(boards)
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: '',
    position: { top: 0, left: 0 }
  })
  const navigate = useNavigate()

  useEffect(() => {
    setSetSortedBoards(boards);
  }, [boards]);


  function handleClick(ev, type) {
    ev.stopPropagation();
    if (type === 'addBoard') {
      if (boards.length === 10) return
    }
    console.log('hey');
    const rect = ev.target.getBoundingClientRect()
    setModalState({
      isOpen: type === 'sort' ? true : !modalState.isOpen,
      type,
      position: {
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX
      }
    });
  }
  function handleBoardItemClick(boardId) {
    setActiveBoardId(boardId)
  }

  function handleSortClick() {
    setShowSortDropdown(!showSortDropdown);
  }


  useEffect(() => {
    if (boardId) {
      setActiveBoardId(boardId)
    }
  }, [boardId])

  function sortByAlphaB() {
    const sortedBoards = [...boards].sort((a, b) => {
      const firstTitle = a.title.toUpperCase()
      const secondTitle = b.title.toUpperCase()
      return firstTitle.localeCompare(secondTitle)
    });

    setModalState(prevState => ({ ...prevState, isOpen: false }))
    setShowSortDropdown(false)
    setSetSortedBoards(sortedBoards)
  }

  async function deleteBoard(boardId) {
    try {
      await removeBoard(boardId)
      navigate('/workspace')
    } catch (err) {
      console.log('Could not delete board')
    }

  }

  console.log('modalState', modalState.isOpen);

  return (
    <section
      className='board-sidebar'
      style={{
        backgroundColor: `${lighten(0.02, `rgba(${board.style.dominantColor.rgb}, 0.9)`)}`
      }}
    >
      {modalState.isOpen && modalState.type === 'edit' && (
        <div className="edit-modal" style={{
          position: 'absolute',
          top: `${modalState.position.top}px`,
          left: `${modalState.position.left}px`,
          zIndex: 1000,
          height: `130px`,
          background: 'white',
        }}>
          <header className="title-container">
            <p>Sort By</p>
            <button className="clean-btn close-modal" onClick={() => {
              setShowSortDropdown(!showSortDropdown)
              setModalState(prevState => ({ ...prevState, isOpen: false }))
            }}>
              {checkList.x}
            </button>
          </header>
          <section className="sorting">
            <label>Sort by</label>
            <div className="options" id="">
              <article>
                <div className="sort" onClick={handleSortClick}>
                  <span >Sort alphabetically</span>
                  <span>{sideBar.arrDown}</span>
                </div>
              </article>
            </div>
            {showSortDropdown && (
              <div className="sort-dropdown">
                <div onClick={() => sortByAlphaB()}><span> Sort alphabetically</span></div>
                <hr className="divider" />
                <div className="disabled" onClick={() => { setShowSortDropdown(false) }}><span>Sort by most recent</span></div>
              </div>)}
          </section>
        </div>
      )}
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

            <header>
              <span>Your Boards</span>
              <article className="actions">
                <div className="dots" onClick={(event) => {
                  handleClick(event, 'edit')

                }}>
                  {sideBar.dots}
                </div>
                <div className="plus" onClick={(event) => handleClick(event, 'addBoard')}>
                  {sideBar.plus}
                </div>
              </article>
            </header>
            {sortedBoards.map((boardItem) => (
              <section
                key={boardItem._id}
                className={`${activeBoardId === boardItem._id ? 'active' : ''}`}
                onClick={() => handleBoardItemClick(boardItem._id)}
              >
                <img src={boardItem.style.backgroundImage} alt="" />
                <Link to={`/board/${boardItem._id}`}>{boardItem.title}</Link>
                <span onClick={() => deleteBoard(boardItem._id)}>{checkList.garbage}</span>
              </section>
            ))}
          </section>

        )}
      </ul>

      {modalState.isOpen && modalState.type === 'addBoard' && (
        <div className="add-board-modal" style={{
          position: 'absolute',
          top: `${modalState.position.top}px`,
          left: `${modalState.position.left}px`,
          zIndex: 1001,
          background: 'white',
        }}>
          <AddBoard setSidebarExpand={setSidebarExpand} modalState={modalState} setModalState={setModalState} pos={{ style: { bottom: '0', right: '0' } }} />
        </div>
      )}

    </section>
  );
}
