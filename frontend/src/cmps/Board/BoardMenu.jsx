import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import { removeBoard } from '../../store/actions/board.actions'

import { AboutBoard } from './AboutBoard'
import { BoardChangeBgc } from './BoardChangeBgc'
import { BoardActivity } from './BoardActivity'

import { boardMenu, checkList, groupMenu } from "../Svgs"

export function BoardMenu({ setMenu, isMenuOpen }) {

    const board = useSelector((storeState) => storeState.boardModule.board)
    const { boardId } = useParams()
    const navigate = useNavigate()

    const [currentContent, setCurrentContent] = useState('default')
    const [title, setTitle] = useState('Menu')

    const contentTitleMap = {
        aboutBoard: "About Board",
        changeBgc: "Change Background",
        activities: "Activity",
        default: "Menu"
    };

    function handleContentChange(contentKey) {
        setCurrentContent(contentKey);
        setTitle(contentTitleMap[contentKey]);
    }

    async function deleteBoard() {
        try {
            await removeBoard(boardId)
            navigate('/workspace')
        } catch (err) {
            console.error('Could not delete board', err)
        }

    }


    function renderContent() {
        switch (currentContent) {
            case 'aboutBoard':
                return <AboutBoard />
            case 'changeBgc':
                return <BoardChangeBgc setTitle={setTitle} />
            case 'activities':
                return <BoardActivity board={board} />
            default:
                return (
                    <section className='board-menu-content-frame'>
                        <section className="board-menu-info ">
                            <span className="nav-icon">{boardMenu.info}</span>
                            <p className="nav-item" onClick={() => handleContentChange('aboutBoard')}>About this board</p>
                        </section>
                        <section onClick={() => handleContentChange('activities')} className='board-menu-activities'>
                            <span className='nav-icon' >{boardMenu.activity}</span>
                            <p className='nav-item'>Activity</p>
                        </section>
                        <hr className='divider' />
                        <article onClick={() => handleContentChange('changeBgc')} className='board-menu-change-bgc'>
                            <img className='nav-icon' src={board.style.backgroundImage} alt="" />
                            <p className='nav-item'>Change Background</p>
                        </article>
                        <section className="board-menu-info ">
                            <span className="nav-icon">{checkList.garbage}</span>
                            <p className="nav-item" onClick={deleteBoard}>Delete board</p>
                        </section>
                        <section>
                        </section>
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
                                <button onClick={() => handleContentChange('default')} className="back-btn clean-btn">
                                    {groupMenu.backArr}</button>
                            )}
                            <h3>{title}</h3>
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
