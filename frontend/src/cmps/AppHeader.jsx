import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { appHeaderSvg, sideBar, taskSvg, workspaceSvg } from './Svgs'
import { useEffect, useState, useRef } from 'react'
import { AddBoard } from './Board/AddBoard'
import { loadUsers, login } from '../store/actions/user.actions'
import { UserDetailsDisplay } from './UserDetailsDisplay'
import { updateBoards } from '../store/actions/board.actions'
import { UserNotifications } from './UserNotifications'
import { socketService } from '../services/socket.service'


export function AppHeader() {
    const boardStyle = useSelector((storeState) => storeState.boardModule.board.style) || null
    const user = useSelector(storeState => storeState.userModule.user)
    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false)
    const [brightClass, setBrightClass] = useState(true)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [modalState, setModalState] = useState({ isOpen: false, modal: '' })
    const inputRef = useRef(null)
    const navigate = (useNavigate())
    const [searchInput, setSearchInput] = useState(null)
    const [filterdBoards, setFilterdBoards] = useState([...boards])
    const [starredBoards, setStarredBoards] = useState([])
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isPhoneDisplay, setIsPhoneDisplay] = useState({ isDisplay: false, isSearch: true })
    const [extandedWidthSearch, setExtandedWidthSearch] = useState('160px')
    const [isNotificationsOpen, setNotificationsOpen] = useState(false)
    let [notifications, setNotifications] = useState([])
    let [newActivity, setNewActivity] = useState(null)
    const [hasUnseenActivities, setHasUnseenActivities] = useState(false)
    const [unseenActivityCount, setUnseenActivityCount] = useState(0)
    const LOCAL_STORAGE_ACTIVITIES_KEY = 'activitiesData';

    useEffect(() => {
        const allActivities = boards.flatMap(board =>
            board.activities.filter(activity => activity.byMember._id !== user?._id)
        )
        const sortedActivities = allActivities.sort((a, b) => b.createdAt - a.createdAt)
        setNotifications(sortedActivities)

        const activitiesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACTIVITIES_KEY)) || {}
        const unseenCount = sortedActivities.reduce((count, activity) => {
            return count + (activitiesData[`seenActivity_${activity.id}`] ? 0 : 1)
        }, 0);
        setUnseenActivityCount(unseenCount)
    }, [boards, user?._id])

    useEffect(() => {
        const activitiesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACTIVITIES_KEY)) || {}
        const hasUnseen = activitiesData.hasUnseenActivities || false
        setHasUnseenActivities(hasUnseen)
    }, [])

    useEffect(() => {
        const handleNewActivity = (activity) => {
            if (activity.byMember._id === user._id) return
            setNewActivity(activity)
            const activitiesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACTIVITIES_KEY)) || {}
            activitiesData.hasUnseenActivities = true;
            activitiesData.unseenActivityCount = (activitiesData.unseenActivityCount || 0) + 1
            localStorage.setItem(LOCAL_STORAGE_ACTIVITIES_KEY, JSON.stringify(activitiesData))
            setHasUnseenActivities(true)
            setUnseenActivityCount(prevCount => prevCount + 1)
        }

        socketService.on('board-activity', handleNewActivity)
        return () => {
            socketService.off('board-activity', handleNewActivity)
        }
    }, [user?._id])

    const handleNotificationsOpen = () => {
        setNotificationsOpen(!isNotificationsOpen);
        if (!isNotificationsOpen) {
            const activitiesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACTIVITIES_KEY)) || {};
            notifications.forEach(activity => {
                activitiesData[`seenActivity_${activity.id}`] = true;
            });
            activitiesData.unseenActivityCount = 0;
            localStorage.setItem(LOCAL_STORAGE_ACTIVITIES_KEY, JSON.stringify(activitiesData));
            setUnseenActivityCount(0);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])



    function handleResize() {
        const screenWidth = window.innerWidth
        if (screenWidth > 1320) {
            setIsPhoneDisplay({ isDisplay: false, isSearch: true })
            setExtandedWidthSearch(780)
        }
        else if (screenWidth >= 780 || screenWidth <= 1320) {
            setIsPhoneDisplay({ isDisplay: false, isSearch: true })
            setExtandedWidthSearch(screenWidth - 600)
        }
        if (screenWidth <= 780 && screenWidth > 530) {
            setIsPhoneDisplay({ isDisplay: true, isSearch: true })
            setExtandedWidthSearch(screenWidth - 270)
        }
        if (screenWidth <= 530) setIsPhoneDisplay({ isDisplay: true, isSearch: false })

    }


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

    useEffect(() => {
        const newStarredBoards = boards.filter(board => board.isStarred)
        setStarredBoards(newStarredBoards)
    }, [boards])


    function onCreateBoard() {
        setModalState(prevState => ({ ...prevState, isOpen: true, modal: 'create' }))

    }

    function onOpenHeaderSearch() {
        setFilterdBoards([...boards])
        setModalState(prevState => ({ ...prevState, isOpen: true, modal: 'search' }))
        inputRef.current.focus()
        setIsSearchOpen(true)
    }

    function onOpenBoard(ev, boardId) {
        ev.stopPropagation();
        navigate(`/board/${boardId}`);
        setIsSearchOpen(false)
        inputRef.current.blur()
    }

    function onOpenStarredBoard() {
        setModalState(prevState => ({ ...prevState, isOpen: !prevState.isOpen, modal: 'starred' }))
    }

    async function onStarredBoard(event, boardToChange) {
        event.preventDefault()
        event.stopPropagation()
        boardToChange.isStarred = !boardToChange.isStarred
        try {
            await updateBoards(boards, boardToChange, user, 'txt')
        } catch (err) {
            console.log('could not star the board', err)
        }
    }

    return (
        <>
            <header className='app-header' style={{ backgroundColor: `rgb(${boardStyle?.dominantColor.rgb})` || 'white' }}>
                <section className='nav-links'>
                    <NavLink to={isPhoneDisplay.isDisplay ? "/workspace" : "/"}>
                        <div onClick={() => { setModalState(prevState => ({ ...prevState, isOpen: false, modal: '' })) }}
                            className={'logo' + (brightClass ? ' dark-btn' : ' light-btn')}>
                            FELLOW
                        </div>
                    </NavLink>
                    <section className='links'>
                        {!isPhoneDisplay.isDisplay && <NavLink to={"/workspace"}>
                            <button onClick={() => { setModalState(prevState => ({ ...prevState, isOpen: false, modal: '' })) }}
                                className={'app-header-btn nav-link-btn link ' +
                                    (brightClass ? ' dark-btn' : ' light-btn')}><span>My workspace</span></button>
                        </NavLink>}
                        {!isPhoneDisplay.isDisplay && <button className={'app-header-btn nav-link-btn link starred-btn' +
                            (brightClass ? ' dark-btn' : ' light-btn')}
                            onClick={onOpenStarredBoard}>
                            <span>Starred</span> {appHeaderSvg.arrowDown}
                            {modalState.isOpen && modalState.modal === 'starred' && <section className='starred-boards'>
                                {starredBoards.length === 0 &&
                                    <>
                                        <img className='empty-img' src="https://trello.com/assets/cc47d0a8c646581ccd08.svg" alt="" />
                                        <h3>Star important boards to access them quickly and easily.</h3>
                                    </>}

                                {starredBoards.length > 0 && <section className='starred-board-list'>
                                    {starredBoards.map(board => {
                                        return <div
                                            key={board._id}
                                            onClick={(event) => { onOpenBoard(event, board._id) }}
                                            className='starred-board'>
                                            <section className='board-info'>
                                                <img className='board-img' src={board.style.backgroundImage} alt="Board background" />
                                                <span>{board.title}</span>
                                            </section>
                                            <span className='full-star-icon'>{workspaceSvg.fullStar}
                                                <span onClick={(event) => { onStarredBoard(event, board) }} className='empty-star-icon'>{workspaceSvg.star}</span>
                                            </span>
                                        </div>
                                    })}
                                </section>}
                            </section>}
                        </button>}
                    </section>
                    <button onClick={onCreateBoard}
                        className={'create-btn' + (brightClass ? ' dark-btn' : ' light-btn')}
                    // onBlur={() => (setModalState(prevState => ({ ...prevState, isOpen: false, modal: '' })))}
                    >{isPhoneDisplay.isDisplay ? sideBar.plus : 'Create board'}
                        {modalState.isOpen && modalState.modal === 'create' &&
                            <div className='add-board-container-header'
                                style={{
                                    top: '40px',
                                    left: isPhoneDisplay.isDisplay ? '-120px' : '-15px',
                                    position: 'absolute',
                                    zIndex: '1000'
                                }}>
                                <AddBoard pos={true} setModalState={setModalState} />
                            </div>}
                    </button>
                </section>

                <section className='nav-info'>
                    {isPhoneDisplay.isSearch &&
                        <div className={'search-app-header' +
                            (brightClass ? ' dark-btn' : ' light-btn') +
                            (isSearchOpen ? ' open' : '')}
                            onClick={onOpenHeaderSearch}                >
                            <div className='search-input'
                                onBlur={() => {
                                    setIsSearchOpen(false)
                                    setModalState(prevState => ({ ...prevState, isOpen: false, modal: '' }))
                                }}>
                                <span>{appHeaderSvg.search}</span>
                                <input type="text" placeholder={isSearchOpen ? 'Search trello' : 'Search'} ref={inputRef}
                                    onChange={(event) => { setSearchInput(event.target.value) }}
                                    style={{ width: isSearchOpen ? `${extandedWidthSearch - 35}px` : '200px' }} />

                                {isSearchOpen &&
                                    <div
                                        style={{ right: '0px', top: '38px', width: `${extandedWidthSearch}px` }}
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
                            </div>
                        </div>}

                    {isPhoneDisplay.isDisplay && !isPhoneDisplay.isSearch && <NavLink to={'/search'}>
                        <button className={'search-btn' +
                            (brightClass ? ' dark-btn' : ' light-btn')}>
                            {appHeaderSvg.search}
                        </button>
                    </NavLink>}
                    <button style={{ position: 'relative' }} onClick={handleNotificationsOpen} className={'app-header-btn user-info' + (brightClass ? ' dark-btn' : ' light-btn')}>
                        {appHeaderSvg.notifications}</button>
                    {unseenActivityCount > 0 && (
                        <span className="notification-indicator">{unseenActivityCount}</span>
                    )}
                    {user &&
                        <>
                            <div className={'app-header-btn user-info' + (brightClass ? ' dark-btn' : ' light-btn')} >
                                <img onClick={() => setIsUserDetailOpen(!isUserDetailOpen)} src={user.imgUrl} alt="" />
                            </div>
                            {isUserDetailOpen && (<UserDetailsDisplay isUserDetailOpen={isUserDetailOpen} setIsUserDetailOpen={setIsUserDetailOpen} user={user} />)}
                        </>
                    }
                </section>
            </header>
            {isNotificationsOpen && (
                <UserNotifications
                    user={user}
                    isNotificationsOpen={isNotificationsOpen}
                    setNotificationsOpen={setNotificationsOpen}
                    boards={boards}
                    notifications={notifications}
                    newActivity={newActivity} // Pass new activity as props to UserNotifications
                    setNewActivity={setNewActivity}
                />
            )}
        </>
    )
}