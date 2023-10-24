import React from 'react';

import { boardMenu } from "../Svgs";
import { useSelector } from 'react-redux';

export function BoardMenu({setMenu, isMenuOpen}){
    const board = useSelector((storeState) => storeState.boardModule.board)

    return (
        <div className={`board-menu ${isMenuOpen ? 'translate' : ''}`}>
            <div className="board-menu-container">
                <div className="board-menu-tab-content">

                        <header className="board-menu-header">
                            <div>
                                <h3>Menu</h3>
                                <button className="clean-btn" onClick={() => setMenu(false)}>x</button>
                            </div>
                        </header>
                        <hr className="divider"/>
                    <section className='board-menu-content-frame'>
                        <section className="board-menu-info ">
                            <span className="nav-icon">{boardMenu.info}</span>
                            <p className="nav-item">About this board</p>
                        </section>
                        <section className='board-menu-activities'>
                            <span className='nav-icon'>{boardMenu.activity}</span>
                            <p className='nav-item'>Activity</p>
                        </section>
                        <hr className='divider'/>
                        <article className='board-menu-change-bgc'>
                            <img className='nav-icon' src={board.style.backgroundImage} alt="" />
                            <p className='nav-item'>Change Background</p>
                        </article>
                    </section>
                </div>
            </div>
        </div>
    )
}