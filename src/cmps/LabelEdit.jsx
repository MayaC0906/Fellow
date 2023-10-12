import { useSelector } from 'react-redux'
import { additionTaskSvg, taskSvg } from './Svgs'
import { Checkbox } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { AddLabel } from './AddLabel'
import { loadTask, toggleMemberOrLabel } from '../store/actions/board.actions'
import { useParams } from 'react-router'
import { Textarea } from '@mui/joy'

export function LabelEdit({ editName, onCloseEditTask, setTask }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [labels, setLabels] = useState(board.labels)
    const [checkedLabelsStart, setCheckedLabelsStart] = useState([])
    const [isLabelEdit, setIsLabelEdit] = useState(false)
    const [labelToEdit, setLabelToEdit] = useState(null)

    const { boardId, groupId, taskId } = useParams()
    let isLabel = useRef(false)

    useEffect(() => {
        loadCheckedLabels()
        setLabels(board.labels)
    }, [board.labels])

    async function loadCheckedLabels() {
        const task = await loadTask(boardId, groupId, taskId)
        setCheckedLabelsStart(task.labelIds)
    }

    function onAddLabel(label) {
        setIsLabelEdit(!isLabelEdit)
        setLabelToEdit(label)
    }

    async function onToggleLabelToTask(labelId) {
        isLabel = true
        try {
            await toggleMemberOrLabel(boardId, groupId, taskId, labelId, isLabel)
            const task = await loadTask(boardId, groupId, taskId)
            setTask(prevTask => ({ ...prevTask, labelIds: task.labelIds }))
            setCheckedLabelsStart(task.labelIds)
            isLabel = false
        } catch (err) {
            console.log('Could not save date =>', err)
        }
    }

    function onLabelSearch({ target }) {
        const filteredLabels = board.labels.filter(label =>
            label.title.toLowerCase().includes(target.value.toLowerCase())
        )
        setLabels(filteredLabels)
    }

    return isLabelEdit ? (
        <AddLabel
            onCloseEditTask={onCloseEditTask}
            onAddLabel={onAddLabel}
            labelToEdit={labelToEdit}
            setTask={setTask}
            isLabel={isLabel}
        />) : (

        <section className="edit-modal">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <Textarea placeholder="Search labels..." onChange={onLabelSearch}></Textarea>
                <div className="content">
                    {labels.map(label =>
                    (
                        <section className='label-edit flex'>
                            <div className='checkbox'>
                                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => onToggleLabelToTask(label.id)} checked={checkedLabelsStart.includes(label.id)} />
                            </div >
                            <div className='color' onClick={() => onToggleLabelToTask(label.id)} style={{ backgroundColor: label.color }}>{label.title}</div>
                            <div onClick={() => onAddLabel(label)}>{taskSvg.pencil}</div>
                        </section>
                    )
                    )}
                    <button onClick={() => onAddLabel('')}>Create a new label</button>
                </div>
            </section>
        </section >
    )
}

