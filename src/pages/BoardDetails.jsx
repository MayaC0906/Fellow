import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GroupList } from './GroupList.jsx'
import { loadBoards } from '../store/actions/board.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { boardService } from "../services/board.service.local.js";
export function BoardDetails() {
	const { boardId } = useParams()
    console.log(boardId);
    // const babas = useSelector(storeState => storeState.babaModule.babas)

    useEffect(() => {
        loadBoards()
    }, [])

    // async function onRemoveBaba(babaId) {
    //     try {
    //         await removeBaba(babaId)
    //         showSuccessMsg('Baba removed')            
    //     } catch (err) {
    //         showErrorMsg('Cannot remove baba')
    //     }
    // }

    // async function onAddBaba() {
    //     const baba = babaService.getEmptyBaba()
    //     baba.title = prompt('Title?')
    //     try {
    //         const savedBaba = await addBaba(baba)
    //         showSuccessMsg(`Baba added (id: ${savedBaba._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add baba')
    //     }        
    // }

    // async function onUpdateBaba(baba) {
    //     const price = +prompt('New price?')
    //     const babaToSave = { ...baba, price }
    //     try {
    //         const savedBaba = await updateBaba(babaToSave)
    //         showSuccessMsg(`Baba updated, new price: ${savedBaba.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update baba')
    //     }        
    // }

    // function onAddBabaMsg(baba) {
    //     console.log(`TODO Adding msg to baba`)
    // }
    // function shouldShowActionBtns(baba) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return baba.owner?._id === user._id
    // }

    return (
        <div>
            <GroupList boardId={boardId}/>
            {/* <h3>Baba App</h3>
            <main>
                <button onClick={onAddBaba}>Add Baba ⛐</button>
                <ul className="baba-list">
                    {babas.map(baba =>
                        <li className="baba-preview" key={baba._id}>
                            <h4>{baba.title}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${baba.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{baba.owner && baba.owner.fullname}</span></p>
                            {shouldShowActionBtns(baba) && <div>
                                <button onClick={() => { onRemoveBaba(baba._id) }}>x</button>
                                <button onClick={() => { onUpdateBaba(baba) }}>Edit</button>
                            </div>}

                            <button onClick={() => { onAddBabaMsg(baba) }}>Add baba msg</button>
                        </li>)
                    }
                </ul>
            </main> */}
        </div>
    )
}