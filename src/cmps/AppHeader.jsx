import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { appHeaderSvg } from './Svgs'
import { useEffect, useState, useRef } from 'react'
import { AddBoard } from './Board/AddBoard'
import {  login } from '../store/actions/user.actions'
import { UserDetailsDisplay } from './UserDetailsDisplay'

export function AppHeader() {
    const boardStyle = useSelector((storeState) => storeState.boardModule.board.style) || null
    const user = useSelector(storeState => storeState.userModule.user)
    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false)
    const [brightClass, setBrightClass] = useState(true)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [modalState, setModalState] = useState({ isOpen: false, modal: '' })
    const createBtnRef = useRef(null)
    const searchBtnRef = useRef(null)
    const [modalPosition, setModalPosition] = useState({ top: '', left: '' })
    const inputRef = useRef(null)
    const navigate = (useNavigate())
    const [searchInput, setSearchInput] = useState(null)
    const [filterdBoards, setFilterdBoards] = useState([...boards])
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        onLoadUsers()
    }, [])

    async function onLoadUsers() {
        const users = await userService.getUsers()
        if (!user) login({ username: 'Guest', password: '1234' })
        // setUsers(users)
    }

    // useEffect(() => {
    // }, [user])

    useEffect(() => {
        if (boardStyle) {
            setBrightClass(boardStyle?.isBright)
        } else setBrightClass(true)
    }, [board.style])

    useEffect(() => {
        if (searchInput !== null) {
            const regex = new RegExp(searchInput, 'i')
            let newBoards = boards.filter(board => regex.test(board.title))
            setFilterdBoards(newBoards)
        } else {
            setFilterdBoards(boards.slice())
        }
    }, [searchInput])

    function onCreateBoard() {
        setModalState(prevState => ({ ...prevState, isOpen: !modalState.isOpen, modal: 'create' }))
    }

    function onOpenHeaderSearch() {
        setFilterdBoards([...boards])
        setModalState(prevState => ({ ...prevState, isOpen: true, modal: 'search' }))
        inputRef.current.focus()
        setIsSearchOpen(true)
    }

    useEffect(() => {
        if (modalState.isOpen !== null && createBtnRef.current) {
            getBounds();
        }
    }, [modalState.isOpen]);

    function getBounds() {
        if (modalState.modal === 'create') {
            if (modalState.isOpen && createBtnRef.current) {
                const rect = createBtnRef.current.getBoundingClientRect()
                setModalPosition({
                    top: rect.top + rect.height + 10,
                    left: rect.left
                })
            }
        } else if (modalState.modal === 'search') {
            if (modalState.isOpen && searchBtnRef.current) {
                const rect = searchBtnRef.current.getBoundingClientRect()
                setModalPosition({
                    top: rect.top + rect.height + 20,
                    left: rect.left
                })
            }

        }
    }

    function onOpenBoard(ev, boardId) {
        ev.stopPropagation();
        navigate(`/board/${boardId}`);
        setIsSearchOpen(false)
        inputRef.current.blur()
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
                            (brightClass ? ' dark-btn' : ' light-btn')}><span>My workspace</span></button>
                    </NavLink>
                    <button className={'app-header-btn nav-link-btn link ' + (brightClass ? ' dark-btn' : ' light-btn')}> <span>Starred</span> {appHeaderSvg.arrowDown}</button>
                </section>
                <button onClick={onCreateBoard}
                    className={'create-btn' + (brightClass ? ' dark-btn' : ' light-btn')}
                    ref={createBtnRef}
                    onBlur={() => (setModalState(prevState => ({ ...prevState, isOpen: false, modal: '' })))}
                >Create board</button>
                <Link to={'/login'}>Login</Link>
            </section>

            <section className='nav-info'>
                <div className={'search-app-header' +
                    (brightClass ? ' dark-btn' : ' light-btn') +
                    (isSearchOpen ? ' open' : '')}
                    onClick={onOpenHeaderSearch}
                    ref={searchBtnRef}
                >
                    <div className='search-input'
                        onBlur={() => {
                            setIsSearchOpen(false)
                            setModalState(prevState => ({ ...prevState, isOpen: false, modal: '' }))
                        }}>
                        <span>{appHeaderSvg.search}</span>
                        <input type="text" placeholder={isSearchOpen ? 'Search trello' : 'Search'} ref={inputRef}
                            onChange={(event) => { setSearchInput(event.target.value) }} />
                    </div>
                </div>
                <button className={'app-header-btn user-info' + (brightClass ? ' dark-btn' : ' light-btn')}>{appHeaderSvg.notifications}</button>
                {user &&
                    <>
                        <div className={'app-header-btn user-info' + (brightClass ? ' dark-btn' : ' light-btn')} >
                            <img onClick={() => setIsUserDetailOpen(!isUserDetailOpen)} src={user.imgUrl} alt="" />
                        </div>
                        {isUserDetailOpen && (<UserDetailsDisplay isUserDetailOpen={isUserDetailOpen} setIsUserDetailOpen={setIsUserDetailOpen} user={user} />)}
                    </>
                }
            </section>

            {modalState.isOpen && modalState.modal === 'create' &&
                <div className='add-board-container-header'
                    style={{
                        top: modalPosition.top,
                        left: modalPosition.left,
                        position: 'absolute',
                        zIndex: '1000'
                    }}>
                    <AddBoard pos={modalPosition} setModalState={setModalState} />
                </div>}

            {isSearchOpen &&
                <div
                    style={{ left: modalPosition.left, top: modalPosition.top }}
                    className='searched-boards-header'>
                    <span>BOARDS</span>
                    {filterdBoards.map(board => {
                        return <div
                            onMouseDown={(event) => {
                                event.preventDefault()
                                onOpenBoard(event, board._id)
                            }}
                            className='searched-board'>
                            <img src={board.style.backgroundImage} alt="Board background" />
                            <span>{board.title}</span>
                        </div>
                    })}
                </div>
            }

        </header>
    )
}