import { additionTaskSvg } from './Svgs'
import { Button } from '@mui/material';
import {addChecklist} from '../store/actions/board.actions.js'
import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Textarea } from '@mui/joy';
// import Button from '@mui/material';
import { loadTask } from '../store/actions/board.actions.js';
export function ChecklistEdit({  onCloseEditTask, setTask }) {
    const { boardId, groupId, taskId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const [txt, setTxt] = useState('')



    function handleTextChange(event) {
        setTxt(event.target.value);
    }

    async function onSaveCheckList(){
        try{
            await addChecklist(boardId, groupId, taskId, txt)
            const task = await loadTask(boardId, groupId, taskId)
            console.log('task from comp func:', task);
            setTask(prevTask => ({ ...prevTask, checklists: task.checklists }))
            onCloseEditTask()
        } catch (err) {
            console.log('cant save checklist', err);
            throw err
        }
    }

    
    return (
        <section className="edit-modal">
            <div className="title-container">
                <p>Add checklist</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                        <div className='edit-modal-checklist'>
                            <label >Title</label>
                            <Textarea 
                                    sx={{ border:'none'}}
                                    name="title"
                                    autoFocus
                                    maxRows={1}
                                    onChange={handleTextChange}
                                    defaultValue='Checklist'
                                    />
                            <div>
                                <button className='task-btn'  onClick={onSaveCheckList}>Add</button>
                            </div>
                        </div>
                        </section>
            </section>
    )
}