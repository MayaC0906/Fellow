import { useSelector } from 'react-redux'
import { additionTaskSvg, taskSvg } from '../../Svgs'
import { Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import { Textarea } from '@mui/joy'
import { updateBoard } from '../../../store/actions/board.actions'
import { AddLabel } from './AddLabel'
import { useParams } from 'react-router'

export function LabelEdit({ pos, editName, onCloseEditTask, onSaveTask, task }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [labels, setLabels] = useState(board.labels)
    const [checkedLabelsStart, setCheckedLabelsStart] = useState(task.labelIds)
    const [isLabelEdit, setIsLabelEdit] = useState(false)
    const [labelToEdit, setLabelToEdit] = useState(null)
    const { groupId } = useParams()
    let groups = board.groups

    useEffect(() => {
        console.log('hey');
        setLabels(board.labels)
    }, [board.labels])

    function onAddLabel(label) {
        setIsLabelEdit(!isLabelEdit)
        setLabelToEdit(label)
    }

    async function onToggleLabelToTask(labelId) {
        let newTask
        try {
            const LabelIdx = task.labelIds.findIndex(id => id === labelId)
            if (LabelIdx === -1) {
                newTask = { ...task, labelIds: [...task.labelIds, labelId] }
            } else {
                const updatedLabels = [...task.labelIds]
                updatedLabels.splice(LabelIdx, 1)
                newTask = { ...task, labelIds: updatedLabels }
            }
            onSaveTask(newTask)
            setCheckedLabelsStart(newTask.labelIds)
        } catch (err) {
            console.log('Could not save label =>', err)
        }
    }

    function onLabelSearch({ target }) {
        const filteredLabels = board.labels.filter(label =>
            label.title.toLowerCase().includes(target.value.toLowerCase())
        )
        setLabels(filteredLabels)
    }

    // async function onDeletingLabel() {

    //     console.log('hey');
    //     try {
    //         let updatedLabelsIBoard = board.labels.filter(label => label.id !== labelToEdit.id)
    //         let updatedLabelsInTask = task.labelIds.filter(label => label !== labelToEdit.id)
    //         task = { ...task, labelIds: updatedLabelsInTask }
    //         const currGroup = groups.findIndex(g => g.id === groupId)
    //         let tasks = groups[currGroup].tasks
    //         const currTask = tasks.findIndex(t => t.id === task.id)

    //         tasks[currTask] = task
    //         const newBoard = { ...board, labels: updatedLabelsIBoard, tasks }
    //         console.log('new board', newBoard);
    //         await updateBoard(newBoard)

    //         // await onSaveTask(task)

    //         onAddLabel('')
    //     } catch (err) {
    //         console.log('Cannot remove label', err)
    //         throw err
    //     }
    // }

    async function onDeletingLabel() {
        try {
            let updatedLabelsIBoard = board.labels.filter(label => label.id !== labelToEdit.id)
            const newBoard = { ...board, labels: updatedLabelsIBoard }
            console.log('new board label:', newBoard);
            await updateBoard(newBoard)

            let updatedLabelsInTask = task.labelIds.filter(label => label !== labelToEdit.id)
            task = { ...task, labelIds: updatedLabelsInTask }
            // console.log('task label', task);
            await onSaveTask(task)

            onAddLabel('')
        } catch (err) {
            console.log('Cannot remove label', err)
            throw err
        }
    }


    return isLabelEdit ? (
        <AddLabel
            pos={pos}
            onCloseEditTask={onCloseEditTask}
            onAddLabel={onAddLabel}
            labelToEdit={labelToEdit}
            onSaveTask={onSaveTask}
            task={task}
            setCheckedLabelsStart={setCheckedLabelsStart}
            onDeletingLabel={onDeletingLabel}
        />) : (

        <section style={{ top: pos.top, left: pos.left }} className="edit-modal slide-up">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <Textarea placeholder="Search labels..." onChange={onLabelSearch} sx={{ fontSize: 14, fontWeight: 'medium', borderRadius: '3px', boxShadow: 'inset 0 0 0 1px #091e4224', bgcolor: 'white', color: 'black' }}></Textarea>
                <div className="content">
                    <p className='content-headline'>Labels</p>
                    <ul className='content-labels clean-list'>

                        {labels.map(label =>
                        (
                            <li className='label-edit flex'>
                                <section className='checkbox '>
                                    <Checkbox sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 10 }, padding: 0, width: 20, height: 20, color: 'rgba(23, 43, 77, 0.2)',
                                        '&:checked': {
                                            '& .MuiSvgIcon-root': {
                                                '&.css-i4bv87-MuiSvgIcon-root': {
                                                    color: 'initial'
                                                }
                                            },
                                        }
                                    }}

                                        onClick={() => onToggleLabelToTask(label.id)} checked={checkedLabelsStart.includes(label.id)} />
                                </section >
                                <button className='color clean-btn' onClick={() => onToggleLabelToTask(label.id)} style={{ backgroundColor: label.color }}>{label.title}</button>
                                <button className='pencil clean-btn flex' onClick={() => onAddLabel(label)}>{taskSvg.pencil}</button>
                            </li>
                        )
                        )}
                    </ul>
                    <button className='add-btn clean-btn' onClick={() => onAddLabel('')}>Create a new label</button>
                </div>
            </section>
        </section >
    )
}

