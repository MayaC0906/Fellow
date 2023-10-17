import { useRef, useState } from "react";
import { additionTaskSvg, workspaceSvg } from "./Svgs";
import { Textarea } from "@mui/joy";
import { Button } from "@mui/base";
import { boardService } from "../services/board.service.local";
import { addBoard } from "../store/actions/board.actions";
import { Link, useNavigate } from "react-router-dom";

export function AddBoard({ setIsBoardAdded }) {
    const imgUrls = ['https://res.cloudinary.com/duvatj8kg/image/upload/v1697200986/1_qmyhwb.jpg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1696367896/samples/balloons.jpg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1696367882/samples/landscapes/nature-mountains.jpg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697201095/2_ie2xym.jpg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697201606/a7c521b94eb153008f2d_okvnhu.svg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202495/aec98becb6d15a5fc95e_dseafo.svg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202522/8ab3b35f3a786bb6cdac_ci3ilc.svg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202531/707f35bc691220846678_bdydef.svg', 'https://res.cloudinary.com/duvatj8kg/image/upload/v1697202537/d106776cb297f000b1f4_kroicr.svg']
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
        let savedBoard = { ...newBoard, title: boardTitle }
        if (backGroundgImg) {
            savedBoard.style.backgroundImage = backGroundgImg
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
                            <Textarea required onChange={onSetBoardTtile}
                                sx={{
                                    width: 280, p: '8px 12px', height: 36, fontSize: 12, mb: 1.5, borderRadius: '3px',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: !boardTitle ? 'inset 0 0 0 2px #e34935' : '',
                                    },
                                    '&:active &:focus': {
                                        boxShadow: !boardTitle ? 'inset 0 0 0 2px #388bff' : '',
                                    },
                                }}
                            />
                        </section>
                        <button className={`create-board clean-btn ${boardTitle ? '' : 'boardTileCheck'}`} onClick={onSaveNewBoard}>Create</button>
                    </section>
                </div>
            </section>
        </section>
    )
}