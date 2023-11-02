import React, { useState } from 'react'
import { sideBar } from "../Svgs"
import { ChangeBgcPhotos } from './ChangeBgcPhotos'
import { utilService } from '../../services/util.service'
import { updateBoard } from '../../store/actions/board.actions'
import { useNavigate } from "react-router-dom"
import { ChangeBgcColor } from './ChangeBgcColors'
import { useSelector } from 'react-redux'


export function BoardChangeBgc({ setTitle }) {
    const navigate = useNavigate()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [currentContent, setCurrentContent] = useState('default')
    const user = useSelector((storeState) => storeState.userModule.user)


    function renderContent() {
        switch(currentContent) {
            case 'changePhoto':
                return <ChangeBgcPhotos setTitle={setTitle} onChangeBoardBgc={onChangeBoardBgc} />
            case 'changeClr':
                return <ChangeBgcColor setTitle={setTitle} onChangeBoardBgc={onChangeBoardBgc}/>
            default:
                return (
                    <div className="bgc-modal-layout">   
                        <section className="upper-section">
                            <div onClick={() => setCurrentContent('changePhoto')} className="sq sq1">
                                <img src="https://trello.com/assets/8f9c1323c9c16601a9a4.jpg" alt="" />
                                <span>Photos</span>
                            </div>
                            <div onClick={() => setCurrentContent('changeClr')} className="sq sq2">
                                <img src="https://trello.com/assets/97db30fe74a58b7b7a18.png" alt="" />
                                <span>Colors</span>
                            </div>
                        </section>
                        <hr className="divider"/>
                        {/* <section className="custom-section">
                            <div className="sq sq3">
                                <h2>Custom</h2>
                                <div>{sideBar.plus}</div>
                            </div>
                        </section> */}
                    </div>
                )
        }
    }

    async function onChangeBoardBgc(bgcImg) {
        let boardToSave = { ...board }
        if (bgcImg) {
            boardToSave.style.backgroundImage = bgcImg
            try {
                let dominantColor = await utilService.getDominantColor(bgcImg)
                boardToSave.style.dominantColor = dominantColor
                boardToSave.style.isBright = utilService.isRgbBright(dominantColor.rgb)
                const txt = `${user.fullname} changed this board background.`;
                await updateBoard(boardToSave, user, txt)
                navigate(`/board/${boardToSave._id}`)
            } catch (err) {
                console.log('Could not change board bgc')
                throw err
            }
        }
    }
    return (
        renderContent()
    )
}