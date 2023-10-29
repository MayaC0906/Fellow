import { additionTaskSvg } from '../Svgs'
import { Button } from '@mui/material';
import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Textarea } from '@mui/joy';
import { loadTask } from '../../store/actions/board.actions.js';
import { taskService } from '../../services/task.service.local';
export function ChecklistEdit({ onSaveTask, onCloseEditTask, setTask, task }) {
    const [txt, setTxt] = useState('')
    const { checklists } = task



    function handleTextChange(event) {
        setTxt(event.target.value);
    }

    async function onSaveCheckList() {
        try {
            let checklistsToSave = checklists
            const newList = taskService.getEmptyChecklist(txt)
            checklistsToSave.push(newList)
            const newTask = { ...task, checklists: checklistsToSave }
            // setTask(newTask)
            const activityTxt = `added checklist ${newList.title} to "${task.title}".`
            onSaveTask(newTask, activityTxt)
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
                        sx={{ border: 'none' }}
                        name="title"
                        autoFocus
                        maxRows={1}
                        onChange={handleTextChange}
                        placeholder='Checklist'
                    />
                    <div>
                        <button className='task-btn' onClick={onSaveCheckList}>Add</button>
                    </div>
                </div>
            </section>
        </section>
    )
}