import { useRef, useState } from "react";
import { additionTaskSvg, workspaceSvg } from "./Svgs";

import { boardService } from "../services/board.service.local";
import { addBoard } from "../store/actions/board.actions";
import { Link, useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";

export function AddBoard({ setIsBoardAdded }) {
    const imgUrls = ['https://images.unsplash.com/photo-1696384036025-c7d7b7f6584d?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1696367882/samples/landscapes/nature-mountains.jpg', 'https://trello-backgrounds.s3.amazonaws.com/Shared…9d266d61b55b/photo-1694392295383-75437a29ac91.jpg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697201606/a7c521b94eb153008f2d_okvnhu.svg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202495/aec98becb6d15a5fc95e_dseafo.svg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202522/8ab3b35f3a786bb6cdac_ci3ilc.svg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202531/707f35bc691220846678_bdydef.svg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202537/d106776cb297f000b1f4_kroicr.svg', 'https://images.unsplash.com/photo-1696384036025-c7d7b7f6584d?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
    const [backGroundgImg, setBackGroundImg] = useState('https://res.cloudinary.com/duvatj8kg/image/upload/v1697200986/1_qmyhwb.jpg')
    const [boardTitle, setBoardTtile] = useState('')
    const [newBoard, setNewBoard] = useState(boardService.getEmptyBoard)
    const [savedBoard, setSavedBoard] = useState({})
    let isBoardSaved = false
    const navigate = useNavigate()

    function onSetBoardTtile() {
        let value = event.target.value
        setBoardTtile(value)
    }

    async function onSaveNewBoard() {
        if (!boardTitle) return
        let savedBoard = { ...newBoard, title: boardTitle }
        if (backGroundgImg) {
            savedBoard.style.backgroundImage = backGroundgImg 
            try {
                let dominantColor = await utilService.getDominantColor(backGroundgImg)
                savedBoard.style.dominantColor = dominantColor
                savedBoard.style.isBright = utilService.isRgbBright(dominantColor.rgb)
            } catch (err) {
                console.log('Could not get dominant color');
            }
        }
        try {
            const addedBoard = await addBoard(savedBoard)
            setSavedBoard(addedBoard)
            isBoardSaved = true
            navigate(`/board/${addedBoard._id}`)
        } catch (err) {
            console.log('Could not add new board');
        }
    }

    return (
        <section style={{ bottom: '290px' }} className="edit-modal">
            <div className="title-container">
                <p className="add-board-title">Create board</p>
                <button onClick={() => setIsBoardAdded(false)} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <div className="content">
                    <div className="add-board-display flex justify-center">

                        <section style={{ "background-image": `url(${backGroundgImg})` }} className="display-container flex align-center justify-center">
                            <img className="display-img" src='https://res.cloudinary.com/duvatj8kg/image/upload/v1697199257/14cda5dc635d1f13bc48_l2c80b_1_mlqvif.svg' alt="" />
                        </section>
                    </div>
                    <section className="board-design">
                        <p className="title">Background</p>
                        <div className="img-option">
                            {imgUrls.map(imgUrl =>
                                (<img src={imgUrl} alt="" onClick={() => setBackGroundImg(imgUrl)} />)
                            )}
                        </div>
                        <section className="board-title-input">
                            <p className="title input">Board title <span>*</span></p>
                            <input className={boardTitle ? 'fill-text' : 'none-text'} required id="addBoardTitle" type="text" value={boardTitle} onChange={onSetBoardTtile}
                            />
                        </section>
                        <button className={`create-board clean-btn ${boardTitle ? '' : 'boardTileCheck'}`} onClick={onSaveNewBoard}>Create</button>
                    </section>
                </div>
            </section>
        </section>
    )
}
