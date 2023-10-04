import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { boardService } from "../services/board.service.local.js";
export function BoardDetails() {
    const { boardId } = useParams()
    console.log('boardId', boardId);
    // const babas = useSelector(storeState => storeState.babaModule.babas)

    // useEffect(() => {
    //     loadBabas()
    //     dispatch({ type: 'SET_BOARD', board: updatedBoard })

    // }, [])

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
            hey
            
        </div>
    )
}