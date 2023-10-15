// import { useSelector } from 'react-redux'
// import { additionTaskSvg, taskSvg } from './Svgs'
// import { Checkbox } from '@mui/material'
// import { useEffect, useRef, useState } from 'react'
// import { AddLabel } from './AddLabel'
// import { loadTask, toggleMemberOrLabel } from '../store/actions/board.actions'
// import { useParams } from 'react-router'
// import { Textarea } from '@mui/joy'

// export function LabelEdit({ editName, onCloseEditTask, setTask }) {
//     const board = useSelector(storeState => storeState.boardModule.board)
//     const [labels, setLabels] = useState(board.labels)
//     const [checkedLabelsStart, setCheckedLabelsStart] = useState([])
//     const [isLabelEdit, setIsLabelEdit] = useState(false)
//     const [labelToEdit, setLabelToEdit] = useState(null)

//     const { boardId, groupId, taskId } = useParams()
//     let isLabel = useRef(false)

//     useEffect(() => {
//         loadCheckedLabels()
//         setLabels(board.labels)
//     }, [board.labels])

//     async function loadCheckedLabels() {
//         const task = await loadTask(boardId, groupId, taskId)
//         setCheckedLabelsStart(task.labelIds)
//     }

//     function onAddLabel(label) {
//         setIsLabelEdit(!isLabelEdit)
//         setLabelToEdit(label)
//     }

//     async function onToggleLabelToTask(labelId) {
//         isLabel = true
//         try {
//             await toggleMemberOrLabel(boardId, groupId, taskId, labelId, isLabel)
//             const task = await loadTask(boardId, groupId, taskId)
//             setTask(prevTask => ({ ...prevTask, labelIds: task.labelIds }))
//             setCheckedLabelsStart(task.labelIds)
//             isLabel = false
//         } catch (err) {
//             console.log('Could not save date =>', err)
//         }
//     }

//     function onLabelSearch({ target }) {
//         const filteredLabels = board.labels.filter(label =>
//             label.title.toLowerCase().includes(target.value.toLowerCase())
//         )
//         setLabels(filteredLabels)
//     }

//     return isLabelEdit ? (
//         <AddLabel
//             onCloseEditTask={onCloseEditTask}
//             onAddLabel={onAddLabel}
//             labelToEdit={labelToEdit}
//             setTask={setTask}
//             isLabel={isLabel}
//         />) : (

//         <section className="edit-modal">
//             <div className="title-container">
//                 <p>{editName}</p>
//                 <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
//             </div>
//             <section className="edit-modal-content">
//                 <Textarea placeholder="Search labels..." onChange={onLabelSearch} sx={{ fontSize: 14, fontWeight: 'medium', borderRadius: 0 }}></Textarea>
//                 <div className="content">
//                     <p className='content-headline'>Labels</p>
//                     <section className='content-labels'>

//                         {labels.map(label =>
//                         (
//                             <section className='label-edit flex'>
//                                 <div className='checkbox flex align-center'>
//                                     <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, padding: 0 }} onClick={() => onToggleLabelToTask(label.id)} checked={checkedLabelsStart.includes(label.id)} />
//                                 </div >
//                                 <div className='color flex align-center' onClick={() => onToggleLabelToTask(label.id)} style={{ backgroundColor: label.color }}>{label.title}</div>
//                                 <div className='pencil flex align-center' onClick={() => onAddLabel(label)}>{taskSvg.pencil}</div>
//                             </section>
//                         )
//                         )}
//                     </section>
//                     <button onClick={() => onAddLabel('')}>Create a new label</button>
//                 </div>
//             </section>
//         </section >
//     )
// }

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
                <Textarea placeholder="Search labels..." onChange={onLabelSearch} sx={{ fontSize: 14, fontWeight: 'medium', borderRadius: '3px', boxShadow: 'inset 0 0 0 1px #091e4224', bgcolor: 'white' }}></Textarea>
                <div className="content">
                    <p className='content-headline'>Labels</p>
                    <ul className='content-labels clean-list'>

                        {labels.map(label =>
                        (
                            <li className='label-edit flex'>
                                <section className='checkbox '>
                                    <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 10 }, padding: 0 }} onClick={() => onToggleLabelToTask(label.id)} checked={checkedLabelsStart.includes(label.id)} />
                                </section >
                                <button className='color clean-btn' onClick={() => onToggleLabelToTask(label.id)} style={{ backgroundColor: label.color }}>{label.title}</button>
                                <button className='pencil clean-btn' onClick={() => onAddLabel(label)}>{taskSvg.pencil}</button>
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

