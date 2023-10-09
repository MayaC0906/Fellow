import { useState } from "react";
import { useSelector,useDispatch } from 'react-redux'
import { sideBar } from "./Svgs";
export function BoardSidebar() {
    const [isSidebarExpand, setSidebarExpand] = useState(false);

    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const board = useSelector((storeState) => storeState.boardModule.board)
    console.log(boards);
    return (
        <section className='board-sidebar'>
            <ul className={`${isSidebarExpand ? 'expand' : 'unexpand'}`}> 
                    {
                    !isSidebarExpand 
                    ? <div className='expand-btn' onClick={() => setSidebarExpand(!isSidebarExpand)}>
                        
                        <span>{sideBar.rightArr}</span>
                        </div> 
                    : [boards].map(board => (
                    <li>
                        <header>
                            <logo>F</logo>
                            <div>
                                <h3>Fellow's workspace</h3>
                                <p>Free</p>
                            </div>
                            <button className='unexpand-btn clean-btn' onClick={() => setSidebarExpand(!isSidebarExpand)}>
                                
                                <span>{sideBar.leftArr}</span>
                            </button>
                        </header>    
                        <div className="upper-section">

                            <section className="boards" key={board._id}> 
                                <div className="svg">{sideBar.boards}</div>
                                <span>Boards</span>   
                            </section>
                            <section>
                                <div className="svg">{sideBar.members}</div>
                                <span>Members</span>
                            </section>
                            <section>
                            <div className="svg">{sideBar.workspace}</div>
                                <span>
                                    Workspace settings
                                </span>
                            </section>
                        </div>
                    </li>
                    ))
                }
            </ul>
        </section>
    )
}
