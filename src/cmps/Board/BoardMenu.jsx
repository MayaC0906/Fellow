import React, { useState } from 'react'

import { boardMenu, checkList } from "../Svgs"
import { useSelector } from 'react-redux'
import { AboutBoard } from './AboutBoard'
import { BoardChangeBgc } from './BoardChangeBgc'
import { groupMenu } from '../Svgs'


export function BoardMenu({ setMenu, isMenuOpen }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [currentContent, setCurrentContent] = useState('default')

    const renderContent = () => {
        switch(currentContent) {
            case 'aboutBoard':
                return <AboutBoard />
            case 'changeBgc':
                return <BoardChangeBgc />
            default:
                return (
                    <section className='board-menu-content-frame'>
                        <section className="board-menu-info ">
                            <span className="nav-icon">{boardMenu.info}</span>
                            <p className="nav-item" onClick={() => setCurrentContent('aboutBoard')}>About this board</p>
                        </section>
                        <section className='board-menu-activities'>
                            <span className='nav-icon'>{boardMenu.activity}</span>
                            <p className='nav-item'>Activity</p>
                        </section>
                        <hr className='divider' />
                        <article onClick={() => setCurrentContent('changeBgc')} className='board-menu-change-bgc'>
                            <img className='nav-icon' src={board.style.backgroundImage} alt="" />
                            <p className='nav-item'>Change Background</p>
                        </article>
                    </section>
                )
        }
    }

    return (
        <div className={`board-menu ${isMenuOpen ? 'translate' : ''}`}>
            <div className="board-menu-container">
                <div className="board-menu-tab-content">
                    <header className="board-menu-header">
                        <div>
                        {currentContent !== 'default' && (
                                <button onClick={() => setCurrentContent('default')} className="back-btn clean-btn">
                                {groupMenu.backArr}</button>
                            )}
                            <h3>Menu</h3>
                            <button className="close-btn clean-btn" onClick={() => setMenu(false)}>{checkList.x}</button>
                        </div>
                    </header>
                    <hr className="divider" />
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
