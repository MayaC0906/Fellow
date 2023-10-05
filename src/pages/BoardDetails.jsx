import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GroupList } from './GroupList.jsx'
import { loadBoard, loadBoards } from '../store/actions/board.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { boardService } from "../services/board.service.local.js";
import { SET_BOARD } from '../store/reducers/board.reducer.js'
import { GroupHeader } from "../cmps/GroupHedear"

export function BoardDetails() {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    
    useEffect(() => {
        loadBoards()
        onLoadBoard()
    }, [boardId])


   async function onLoadBoard(){
        try {
            const board = await loadBoard(boardId)
            console.log(board,' from details ');
            dispatch({ type: SET_BOARD, board })
        } catch(err) {
            console.log('cant set board', err);
            throw err
        }     
    }

    


    return (
        <div className="board-details-container">
            <GroupHeader />
            <GroupList boardId={boardId}/>
        </div>
    )
}



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