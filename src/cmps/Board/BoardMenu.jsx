import React, { useState } from 'react';

import { boardMenu } from "../Svgs";
import { useSelector } from 'react-redux';
import { AboutBoard } from './AboutBoard';
import { BoardChangeBgc } from './BoardChangeBgc';
export function BoardMenu({ setMenu, isMenuOpen }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [isAboutBoardOpen, setIsAboutBoardOpen] = useState()
    const [isChangeBgcOpen, setIsChangeBgcOpen] = useState(false)
    // function getCmp() {
    //     switch(title) {
    //         case 'Menu': 
    //     }
    // }
    console.log('check', isChangeBgcOpen);
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
                    <hr className="divider" />
                    <section className='board-menu-content-frame'>
                        {isAboutBoardOpen && <AboutBoard />}
                        <section className="board-menu-info ">
                            <span className="nav-icon">{boardMenu.info}</span>
                            <p className="nav-item" onClick={() => setIsAboutBoardOpen(true)}>About this board</p>
                        </section>
                        <section className='board-menu-activities'>
                            <span className='nav-icon'>{boardMenu.activity}</span>
                            <p className='nav-item'>Activity</p>
                        </section>
                        <hr className='divider' />
                        <article onClick={() => setIsChangeBgcOpen(!isChangeBgcOpen)}  className='board-menu-change-bgc'>
                            <img  className='nav-icon'  src={board.style.backgroundImage} alt="" />
                            <p className='nav-item'>Change Background</p>
                            
                        </article>
                    </section>
                    {isChangeBgcOpen && <BoardChangeBgc />}
                </div>
            </div>
        </div>
    )
}