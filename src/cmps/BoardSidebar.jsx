import { useState } from "react";
import { useSelector,useDispatch } from 'react-redux'

export function BoardSidebar() {
    const [isSidebarExpand, setSidebarExpand] = useState(false);

    const boards = useSelector((storeState) => storeState.boardModule.board)
    console.log(boards);
    return (
        <section className='board-sidebar'>
            <ul className={`${isSidebarExpand ? 'expand' : 'unexpand'}`}>
               
            {
            !isSidebarExpand 
            ? <button className='expand-btn' onClick={() => setSidebarExpand(!isSidebarExpand)}>{'>'}</button> 
            : [boards].map(board => (
            <li>
                <header>
                    <logo>F</logo>
                    <div>
                        <h3>Fellow's workspace</h3>
                        <p>Free</p>
                    </div>
                    <button className='unexpand-btn clean-btn' onClick={() => setSidebarExpand(!isSidebarExpand)}>{'<'}</button>
                </header>    
                
                <section className="boards" key={board._id}>    
                </section>
            </li>
      ))
}

                
                
                {/* Add more list items or content here when the sidebar expands */}
            </ul>
        </section>
    )
}
