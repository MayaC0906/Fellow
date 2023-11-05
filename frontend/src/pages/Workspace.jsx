import { useEffect, useRef, useState } from "react"
import { loadBoards, updateBoard, updateBoards } from "../store/actions/board.actions"
import { useSelector } from "react-redux"
import { loaderSvg, workspaceSvg } from "../cmps/Svgs"
import { AddBoard } from "../cmps/Board/AddBoard"
import { BoardList } from "../cmps/Board/BoardList"

export function Workspace() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const user = useSelector(storeState => storeState.userModule.user)
    const [isBoardAdded, setIsBoardAdded] = useState(false)
    const [addBoardPosition, setAddBoardPosition] = useState({ top: '', left: '' })
    const createBoardRef = useRef()
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        onLoadBoars()
    }, [])

    async function onLoadBoars() {
        await loadBoards(user)
        console.log('boards loaded');
        setIsLoading(false)
    }

    let starredBoards = getStarredBoards()

    function getStarredBoards() {
        if (!boards || !boards.length) return
        return boards.filter(board => board.isStarred)
    }

    async function onStarredBoard(event, boardToChange) {
        event.preventDefault();
        boardToChange.isStarred = !boardToChange.isStarred;
        try {
            await updateBoards(boards, boardToChange, user, 'starrd')
            getStarredBoards()
        } catch (err) {
            console.log('could not star the board', err);
        }
    }

    function onSetIsBoardAdded() {
        getBounds();
        setIsBoardAdded(!isBoardAdded);
    }

    function getBounds() {
        const addBoarddRect = createBoardRef.current.getBoundingClientRect()
        console.log(addBoarddRect);

        //DO NOT DELETE!!!!

        // if (addBoarddRect.y < 145) {
        //     setAddBoardPosition({
        //         top: addBoarddRect.top,
        //         left: addBoarddRect.left + 205
        //     })
        // }
        // if (addBoarddRect.x > 590) {
        //     console.log(1);
        //     setAddBoardPosition({
        //         top: addBoarddRect.top,
        //         left: addBoarddRect.left + 200
        //     })
        // }
        // if (addBoarddRect.x < 540) {
        //     console.log(2);
        //     setAddBoardPosition({
        //         top: addBoarddRect.top,
        //         left: addBoarddRect.left - 317
        //     })
        if (addBoarddRect.y > 540) {
            console.log(3);
            setAddBoardPosition({
                top: addBoarddRect.top - 350,
                left: addBoarddRect.left + 200
            })

            if (addBoarddRect.y > 540 && addBoarddRect.x < 550) {
                console.log(4);
                setAddBoardPosition({
                    top: addBoarddRect.top - 350,
                    left: addBoarddRect.left - 317
                })
            }
            if (addBoarddRect.y > 540 && addBoarddRect.x < 270) {
                console.log(5);
                setAddBoardPosition({
                    top: addBoarddRect.top - 350,
                    left: addBoarddRect.left
                })
            }
        } else {
            console.log('else');
            setAddBoardPosition({
                top: addBoarddRect.top,
                left: addBoarddRect.left + 205
            })
        }
        console.log(addBoardPosition);
    }

    if (isLoading) return <div className="loader board"><div>{loaderSvg.loader}</div></div>
    if (boards.length === 0) return (
        <div className="workspace-container">
            <section className="boards">
                <section ref={createBoardRef} className="no-board-container" onClick={onSetIsBoardAdded}>
                    <h2 className="fs14">Create new board</h2>
                </section>
            </section>
            {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} addBoardPosition={addBoardPosition} />}
        </div>
    );
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
                                boards={starredBoards}
                                onStarredBoard={onStarredBoard}
                            />
                        </ul>
                    </section>}
                <section className="boards-workspace-container">
                    <div className="container-title flex align-center">
                        <span className="svg flex align-center justify-center">{workspaceSvg.member}</span>
                        <span className="header-title">Your boards</span>
                    </div>
                    <ul className="second-ul board-list clean-list flex">
                        <BoardList
                            boards={boards}
                            onStarredBoard={onStarredBoard}
                        />
                        <section ref={createBoardRef} className={`boards-add`} onClick={() => onSetIsBoardAdded()}>
                            <h2 className="fs14">Create new board</h2>
                        </section>
                    </ul>
                    {isBoardAdded && <AddBoard setIsBoardAdded={setIsBoardAdded} addBoardPosition={addBoardPosition} />}
                </section>
            </section>
        </section>
    );
}


