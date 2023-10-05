import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.local.js'
import { GroupPreview } from '../cmps/GroupPreview.jsx'
import { saveGroup, removeGroup } from '../store/actions/board.actions.js'
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';


export function GroupList() {
    const [toggleAddCardInput, setToggleCardInput] = useState(false)
    const [newGroup, setNewGroup] = useState(boardService.getEmptyGroup())
	const board = useSelector((storeState) => storeState.boardModule.board)
    const groups = board?.groups
    
    
    useEffect(()=>{
    },[board])

    function handleChange(ev) {
        let { value, name: field } = ev.target
		setNewGroup((prevGroup) => ({ ...prevGroup, [field]: value }))
    }
    

    async function onSaveNewGroup(ev) {
        ev.preventDefault();
        if (!newGroup.title) return;
        try {
            await saveGroup(newGroup, board._id)
            setNewGroup(boardService.getEmptyGroup())
            setToggleCardInput(!toggleAddCardInput)
        } catch (err) {
            console.log('Failed to save new group', err)
        }
    }
   
    async function onRemoveGroup(groupId) {
		try {
			await removeGroup(groupId, board._id)
		} catch (err) {
			console.log('Failed to remove group', err)
		}
	}


    console.log(groups);
    if(!groups) return <div>Loading..</div>
    return (
       <div className='group-list-container'>
            <ul className='group-list clean-list'>
            {board && board?.groups && groups.map((group, idx) => (
                <li className='group-preview-container' key={idx}>
                    <GroupPreview onRemoveGroup={onRemoveGroup} labels={board.labels} members={board.members} group={group} />
                </li>
            ))}
             <section className='add-group-input'>
            {!toggleAddCardInput ?
                <div className='add-group-msg' onClick={() => setToggleCardInput(!toggleAddCardInput)}>+ Add new list</div> :
                <div className='add-group-input-expanded'>
                    <Textarea name="title"
                        placeholder="Enter list title..."
                        autoFocus
                        value={newGroup.title}
						onChange={handleChange} />
                        <section className='add-controls'>
                            <Button type="submit" onClick={onSaveNewGroup}>Add List</Button>
                            <button className='cancel' onClick={() => setToggleCardInput(!toggleAddCardInput)}>X</button>
                        </section>
                </div>}
        </section>
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