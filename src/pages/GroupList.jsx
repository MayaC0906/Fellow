import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {boardService} from '../services/board.service.local.js'
import { GroupPreview } from '../cmps/GroupPreview.jsx'
export function GroupList() {
    // const board = useSelector(storeState => storeState.carModule.board)
	const { boardId } = useParams()

    const [board, setBoard] = useState({})
    useEffect(() => {
        onLoadBoard()
    }, [])

    async function onLoadBoard() {
        try {
            console.log(boardId);
            const boardToDisplay = await boardService.getById(boardId)
            setBoard(boardToDisplay)
        } catch(err) {
            console.log('cannot load board');
            throw err
        }
    }
   
    const groups = board?.groups;

    console.log(groups);
    return (
       <div className='group-list-container'>
            <ul className='group-list clean-list'>
            {board && groups && groups.map((group, idx) => (
                <li className='group-preview-container' key={idx}>
                    <GroupPreview group={group} />
                </li>
            ))}
            </ul>
       </div>
    )
}


 // async function onRemoveCar(carId) {
    //     try {
    //         await removeCar(carId)
    //         showSuccessMsg('Car removed')            
    //     } catch (err) {
    //         showErrorMsg('Cannot remove car')
    //     }
    // }

    // async function onAddCar() {
    //     const car = carService.getEmptyCar()
    //     car.vendor = prompt('Vendor?')
    //     try {
    //         const savedCar = await addCar(car)
    //         showSuccessMsg(`Car added (id: ${savedCar._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add car')
    //     }        
    // }

    // async function onUpdateCar(car) {
    //     const price = +prompt('New price?')
    //     const carToSave = { ...car, price }
    //     try {
    //         const savedCar = await updateCar(carToSave)
    //         showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update car')
    //     }        
    // }

    // function onAddToCart(car){
    //     console.log(`Adding ${car.vendor} to Cart`)
    //     addToCart(car)
    //     showSuccessMsg('Added to Cart')
    // }

    // function onAddCarMsg(car) {
    //     console.log(`TODO Adding msg to car`)
    // }
    // function shouldShowActionBtns(car) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return car.owner?._id === user._id
    // }