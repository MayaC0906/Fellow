import { sideBar } from "./Svgs"
import { useState } from "react"
export function BoardSidebar(){
    const [isSidebarExpand, setSidebarExpand] = useState(false)
    


    return (
        <section className='board-sidebar'>
            {/* <header>LOGO</header> */}
            <ul className={`clean-list ${isSidebarExpand ? 'expand' : ''}`}>
                
                <li>
                    
                    {/* TODO - RENDER BOARD  */}
                    <button className="expand-btn clean-btn"
                     onClick={() => setSidebarExpand(!isSidebarExpand)}>{'>'}</button>
                </li>
            </ul>
        </section>
    )
}