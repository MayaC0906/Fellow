import { useState } from 'react';

import { taskService } from '../../services/task.service.local';

import { Textarea } from '@mui/joy';
import { additionTaskSvg } from '../Svgs'

export function ChecklistEdit({ pos, onSaveTask, onCloseEditTask, task }) {

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
            const activityTxt = `added checklist ${newList.title} to "${task.title}".`
            onSaveTask(newTask, activityTxt)
            onCloseEditTask()
        } catch (err) {
            console.error('cant save checklist', err);
            throw err
        }
    }


    return (
        <section style={{ top: pos.top, left: pos.left }} className="edit-modal slide-up">
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