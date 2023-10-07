import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.local.js'
import { GroupPreview } from '../cmps/GroupPreview.jsx'
import { saveGroup, removeGroup } from '../store/actions/board.actions.js'
import { updateBoard } from '../store/actions/board.actions.js'
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// 

export function GroupList() {
    const [isInputExpand, setInputExpand] = useState(false)
    const [newGroup, setNewGroup] = useState(boardService.getEmptyGroup())
	const board = useSelector((storeState) => storeState.boardModule.board)
    const groups = board?.groups
    const [isLabelsShown, setIsLabelsShown] = useState(false)

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
            setInputExpand(!isInputExpand)
            showSuccessMsg('New group')
        } catch (err) {
            console.log('Failed to save new group', err)
        }
    }

    async function onEditGroup(groupId,{target}){
        let groupToSave = getGroupById(groupId)
        groupToSave.title = target.value
        try {
            await saveGroup(groupToSave, board._id)
        }catch (err) {
            console.log(err);
            throw err
        }
    }

    function getGroupById(groupId){
            const group = groups.find(group => group.id === groupId)
            return group
    }
   
    async function onRemoveGroup(groupId) {
        console.log(groupId);
		try {
			await removeGroup(groupId, board._id)
		} catch (err) {
			console.log('Failed to remove group', err)
		}
	}

    async function onDuplicateGroup(group) {
		let duplicatedGroup = { ...group }
		duplicatedGroup.id = null
		try {
			await saveGroup(duplicatedGroup, board._id)
		} catch (err) {
			console.log('Failed to duplicate group', err)
            throw err
		}
	}

    function handleDrag(result){
        const { destination, source, type } = result
		const copiedBoard = board

		if (!destination || destination.droppableId === source.droppableId
             && destination.index === source.index) return

		if (type === 'groups') {
			const newGroups = [...groups]
			const [reorderedGroups] = newGroups.splice(source.index, 1)
			newGroups.splice(destination.index, 0, reorderedGroups)

			copiedBoard.groups = newGroups
			updateBoard(copiedBoard)
			return
		}
    }


    console.log(groups);
    if(!groups) return <div>Loading..</div>
    return (
        <div className='group-list-container'>
            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId="groups" type="groups" key="groups" direction="horizontal">
                    {(provided) => (
                        <ul 
                            className='group-list clean-list'
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                        >
                            {board?.groups?.map((group, idx) => (
                                <Draggable 
                                    draggableId={group.id} 
                                    key={group.id} 
                                    index={idx}
                                >
                                    {(provided) => (
                                        <li 
                                            className='group-preview-container' 
                                            key={group.id}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <GroupPreview
                                                onDuplicateGroup={onDuplicateGroup}
                                                onEditGroup={onEditGroup}
                                                setIsLabelsShown={setIsLabelsShown}
                                                isLabelsShown={isLabelsShown}
                                                onRemoveGroup={onRemoveGroup}
                                                labels={board.labels}
                                                members={board.members}
                                                group={group}
                                            />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                    </Droppable>
                </DragDropContext>
                <section className='add-group-input'>
                    {!isInputExpand ?
                        <div className='add-group-msg' onClick={() => setInputExpand(!isInputExpand)}>
                            <span>+ Add another list </span>
                        </div> :
                        <div className='add-group-input-expanded'>
                            <Textarea 
                                sx={{ border:'none'}}
                                name="title"
                                placeholder="Enter list title..."
                                autoFocus
                                value={newGroup.title}
                                onChange={handleChange}
                            />
                            <section className='add-controls'>
                                <Button type="submit" onClick={onSaveNewGroup}>Add List</Button>
                                <button className='cancel' onClick={() => setInputExpand(!isInputExpand)}>X</button>
                            </section>
                        </div>
                    }
                </section>         
        </div>
    );
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