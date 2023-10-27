import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { appHeaderSvg } from './Svgs'
import { useEffect, useState, useRef } from 'react'
import { AddBoard } from './Board/AddBoard'

export function AppHeader() {
    const boardStyle = useSelector((storeState) => storeState.boardModule.board.style) || null
    const [brightClass, setBrightClass] = useState(true)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [modalState, setModalState] = useState({ isOpen: false })
    const createBtnRef = useRef(null)
    const [createBoardPosition, setCreateBoardPosition] = useState({ top: '', left: '' })

    useEffect(() => {
        if (boardStyle) {
            setBrightClass(boardStyle?.isBright)
        } else setBrightClass(true)
    }, [board.style])

    function onCreateBoard() {
        setModalState(prevState => ({ ...prevState, isOpen: !modalState.isOpen }))
    }

    useEffect(() => {
        if (modalState.isOpen !== null && createBtnRef.current) {
            getBounds();
        }
    }, [modalState]);

    function getBounds() {
        if (createBtnRef.current) {
            const rect = createBtnRef.current.getBoundingClientRect()
            setCreateBoardPosition({
                top: rect.top + rect.height + 10,
                left: rect.left
            })
        }
    }
    return (
        <header className='app-header' style={{ backgroundColor: `rgb(${boardStyle?.dominantColor.rgb})` || 'white' }}>
            <section className='nav-links'>
                <NavLink to={"/"}>
                <div className={'logo' + (brightClass ? ' dark-btn' : ' light-btn')}>
                    FELLOW
                </div>
                </NavLink>
                <section className='links'>
                    <NavLink to={"/workspace"}>
                        <button className={'app-header-btn nav-link-btn link ' +
                            (brightClass ? ' dark-btn' : ' light-btn')}><span>My workspace</span> {appHeaderSvg.arrowDown}</button>
                    </NavLink>
                    <button className={'app-header-btn nav-link-btn link ' + (brightClass ? ' dark-btn' : ' light-btn')}> <span>Starred</span> {appHeaderSvg.arrowDown}</button>
                </section>
                <button onClick={onCreateBoard}
                    className={'create-btn' + (brightClass ? ' dark-btn' : ' light-btn')}
                    ref={createBtnRef}
                >Create board</button>
            </section>

            <section className='nav-info'>
                <div className={'search-input' + (brightClass ? ' dark-btn' : ' light-btn')} >
                    <span>{appHeaderSvg.search}</span>
                    <input type="text" placeholder='Search' />
                </div>
                <button className={'app-header-btn user-info' + (brightClass ? ' dark-btn' : ' light-btn')}>{appHeaderSvg.notifications}</button>
                <div className={'app-header-btn user-info' + (brightClass ? ' dark-btn' : ' light-btn')} >
                    <img src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg" alt="" />
                </div>
            </section>

            {modalState.isOpen && <div className='add-board-container-header'
                style={{ top: createBoardPosition.top,
                 left: createBoardPosition.left,
                 position: 'absolute',
                 zIndex: '1000' }}>
                <AddBoard pos={createBoardPosition} setModalState={setModalState} />
            </div>}
        </header>
    )
}