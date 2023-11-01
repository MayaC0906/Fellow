import { useEffect, useRef, useState } from "react"
import { loadBoards, updateBoards } from "../store/actions/board.actions"
import { useSelector } from "react-redux"
import { loaderSvg, workspaceSvg } from "../cmps/Svgs"
import { AddBoard } from "../cmps/Board/AddBoard"
import { BoardList } from "../cmps/Board/BoardList"

export function Workspace() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isBoardAdded, setIsBoardAdded] = useState(false)
    const [addBoardPosition, setAddBoardPosition] = useState({ top: '', left: '' })
    const [filteredBoards, setBoardsFiltered] = useState([])
    const createBoardRef = useRef()

    useEffect(() => {
        onLoadBoars()
    }, [filteredBoards])

    async function onLoadBoars() {
        try {
            let boards = await loadBoards()
            if (user._id === 'guest') {
                boards = boards
            } else {
                boards = boards.filter(board => {
                    const isUserMember = board.members.some(boardMember => boardMember._id === user._id);
                    return isUserMember
                })
            }
            setBoardsFiltered(boards)
        } catch (err) {
            console.log('Could not load borads')
        }
    }

    let starredBoards = getStarredBoards()

    function getStarredBoards() {
        if (!filteredBoards || !filteredBoards.length) return
        return filteredBoards.filter(board => board.isStarred)
    }

    async function onStarredBoard(event, boardToChange) {
        event.preventDefault()
        boardToChange.isStarred = !boardToChange.isStarred
        try {
            await updateBoards(filteredBoards, boardToChange, user, 'starrd')
            getStarredBoards()
        } catch (err) {
            console.log('could not star the board', err)
        }
    }

    function onSetIsBoardAdded(ev) {
        getBounds(ev)
        setIsBoardAdded(!isBoardAdded)
    }

    function getBounds() {
        const addBoarddRect = createBoardRef.current.getBoundingClientRect()

        //DO NOT DELETE!!!!

        // if (addBoarddRect.y < 145) {
        //     setAddBoardPosition({
        //         top: addBoarddRect.top,
        //         left: addBoarddRect.left + 205
        //     })
        // }
        if (addBoarddRect.x > 590) {
            setAddBoardPosition({
                top: addBoarddRect.top,
                left: addBoarddRect.left + 200
            })
        }
        if (addBoarddRect.y > 540) {
            setAddBoardPosition({
                top: addBoarddRect.top - 345,
                left: addBoarddRect.left + 200
            })
        }
        else {
            setAddBoardPosition({
                top: addBoarddRect.top,
                left: addBoarddRect.left + 205
            })
        }
    }

    if (!filteredBoards) return <div className="loader board"><div>{loaderSvg.loader}</div></div>
    if (filteredBoards.length === 0) return (
        <div className="workspace-container">
            <section ref={createBoardRef} className="no-board-container" onClick={() => onSetIsBoardAdded()}>
                <h2 className="fs14">Create new board</h2>
                <h3 className="fs12">{10 - filteredBoards.length} remaining</h3>
            </section>
            {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} addBoardPosition={addBoardPosition} />}
        </div>
    )
    return (
        <section className="workspace-container flex">
            <section className="boards flex">
                {starredBoards.length > 0 &&
                    <section className="boards-workspace-container">
                        <div className="container-title flex align-center">
                            <span className="svg flex align-center justify-center">{workspaceSvg.member}</span>
                            <span className="header-title">Starred boards</span>
                        </div>
                        <ul className="board-list clean-list flex">
                            <BoardList
                                filteredBoards={starredBoards}
                                onStarredBoard={onStarredBoard}
                            />
                        </ul>
                    </section>}
                <section className="boards-workspace-container">
                    <div className="container-title flex align-center">
                        <span className="svg flex align-center justify-center">{workspaceSvg.member}</span>
                        <span className="header-title">Your boards</span>
                    </div>
                    <ul className="board-list clean-list flex">
                        <BoardList
                            filteredBoards={filteredBoards}
                            onStarredBoard={onStarredBoard}
                        />
                        <section ref={createBoardRef} className={`boards-add ${10 - filteredBoards.length === 0 ? 'disable' : ''}`} onClick={10 - filteredBoards.length > 0 ? () => onSetIsBoardAdded() : null}>
                            <h2 className="fs14">Create new board</h2>
                            <h3 className="fs12">{10 - filteredBoards.length} remaining</h3>
                        </section>
                    </ul>
                    {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} addBoardPosition={addBoardPosition} />}
                </section>
            </section>
        </section>
    )
}
