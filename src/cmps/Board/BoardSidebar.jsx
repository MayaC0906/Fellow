import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { boardMenu, checkList, sideBar } from "../Svgs";
import { Link, useParams, useLocation } from "react-router-dom";
import { Brightness1 } from "@mui/icons-material";
import { lighten } from 'polished';
import { AddBoard } from '../Board/AddBoard'

export function BoardSidebar() {
    const [isSidebarExpand, setSidebarExpand] = useState(false)
    const [activeBoardId, setActiveBoardId] = useState(null)
    const { boardId } = useParams()
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: '',
        position: { top: 0, left: 0 }
    })

    console.log(modalState);

    function handleClick(ev, type) {
      ev.stopPropagation();

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
                  <button className="clean-btn close-modal" onClick={() => setModalState(prevState => ({ ...prevState, isOpen: false }))}>
                    {checkList.x}
                  </button>
            </header>
            <section className="sorting">
                <label>Sort by</label>
                <div className="options" id="">
                    <article>
                        <div className="sort" onClick={handleSortClick}>
                            <span>Sort alphabetically</span>
                            <span>{sideBar.arrDown}</span>
                        </div>
                    </article>
                </div>
                {showSortDropdown && (
                    <div className="sort-dropdown">
                          <div onClick={() => { console.log("Option 1 selected"); setShowSortDropdown(false); }}><span> Sort alphabetically</span></div>
                          <hr className="divider"/>
                          <div onClick={() => { console.log("Option 2 selected"); setShowSortDropdown(false); }}><span>Sort by most recent</span></div>
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
                <div className="dots" onClick={(event) => handleClick(event, 'edit')}>
                    {sideBar.dots}
                </div>
                <div className="plus" onClick={(event) => handleClick(event, 'addBoard')}>
                    {sideBar.plus}
                </div>
                </article>
            </header>
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
      
      {modalState.isOpen && modalState.type === 'addBoard' && (
                <div className="add-board-modal" style={{
                    position: 'absolute',
                    top: `${modalState.position.top}px`,
                    left: `${modalState.position.left}px`,
                    zIndex: 1001,
                    background: 'white',
                }}>
                    <AddBoard pos={{ style: { bottom: '0', right: '0' } }} />
                </div>
            )}   

               
    </section>
  );
}
