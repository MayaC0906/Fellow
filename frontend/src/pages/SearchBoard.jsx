import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { updateBoards } from "../store/actions/board.actions"

import { loaderSvg, workspaceSvg } from "../cmps/Svgs"

export function SearchBoard() {

    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const user = useSelector((storeState) => storeState.boardModule.user)
    const [filteredBoards, setFilterdBoards] = useState(boards)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (searchInput !== null) {
            const regex = new RegExp(searchInput, 'i')
            let newBoards = boards.filter(board => regex.test(board.title))
            setFilterdBoards(newBoards)
        } else {
            setFilterdBoards(boards.slice())
        }
    }, [searchInput])

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

    if (!boards.length) return <div className="loader board"><div>{loaderSvg.loader}</div></div>
    return <section className="search-board-cmp">
        <section className="search-board">
            <h3>Search</h3>
            <input
                type="text"
                placeholder="Search board"
                onChange={(event) => { setSearchInput(event.target.value) }} />
            <h4>Boards</h4>
            <ul className="boards-to-filter clean-list">
                {filteredBoards.map(board => {
                    return <NavLink to={`/board/${board._id}`}>
                        <li>
                            <div className="board-info">
                                <img src={board.style.backgroundImage} alt="board background" />
                                <h5>{board.title}</h5>
                            </div>
                            {
                                board.isStarred && <span onClick={(event) => { onStarredBoard(event, board) }}
                                    className="full-star-icon">{workspaceSvg.fullStar}
                                    <span className="empty-star-icon">{workspaceSvg.star}</span></span>
                            }
                            {
                                !board.isStarred && <span onClick={(event) => { onStarredBoard(event, board) }}
                                    className="empty-star-icon unStarred">{workspaceSvg.star}</span>
                            }
                        </li>
                    </NavLink>
                })}
            </ul>
        </section>
    </section>
}