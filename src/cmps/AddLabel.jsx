import { Textarea } from "@mui/joy";
import { additionTaskSvg, taskSvg } from "./Svgs";
import { useState } from "react";
import { boardService } from "../services/board.service.local";
import { useParams } from "react-router";
import { loadTask, removeLabelFromBoard, removeLabelOrMemberFromTask, saveLabelOnBoard } from '../store/actions/board.actions'


export function AddLabel({ onCloseEditTask, onAddLabel, labelToEdit, setTask, isLabel }) {
    const labelsColorPickers = ['#baf3db', '#f8e6a0', '#ffe2bd', '#ffd2cc', '#dfd8fd', '#4bce97', '#e2b203', '#faa53d', '#f87462', '#9f8fef', '#1f845a', '#946f00', '#b65c02', '#ca3521', '#6e5dc6', '#cce0ff', '#c1f0f5', '#D3F1A7', '#fdd0ec', '#dcdfe4', '#579dff', '#60c6d2', '#94c748', '#e774bb', '#8590a2', '#0c66e4', '#1d7f8c', '#5b7f24', '#ae4787', '#626f86',]
    const { title, color } = labelToEdit
    const colorStart = color ? color : '#60c6d2'
    const titleStart = title ? title : ''
    const [colorSelected, setColorSelected] = useState(colorStart)
    const [newLabel, setNewLabel] = useState(boardService.getEmptyLabel())
    const [labelTitle, setTitle] = useState(titleStart)
    const { boardId, groupId, taskId } = useParams()

    function onSetTitle() {
        let value = event.target.value
        setTitle(value)
    }

    async function onSaveLabel() {
        let savedLabel
        if (labelToEdit.id) {
            savedLabel = { ...labelToEdit, color: colorSelected, title: labelTitle }
        } else {
            savedLabel = { ...newLabel, color: colorSelected, title: labelTitle }
        }
        try {
            await saveLabelOnBoard(boardId, savedLabel)
            const task = await loadTask(boardId, groupId, taskId)
            setTask(prevTask => ({ ...prevTask, labelIds: task.labelIds }))
            onAddLabel('')
        } catch (err) {
            console.log('Cannot save label', err)
            throw err
        }

    }

    async function onDeletingLabel() {
        isLabel = true
        try {
            const board = await removeLabelFromBoard(boardId, labelToEdit.id)
            await removeLabelOrMemberFromTask(boardId, groupId, taskId, labelToEdit.id, isLabel)
            const task = await loadTask(boardId, groupId, taskId)
            setTask(prevTask => ({ ...prevTask, labelIds: task.labelIds }))
            isLabel = false
            onAddLabel('')
        } catch (err) {
            console.log('Cannot remove label', err)
            throw err
        }
    }

    return (
        <section className="edit-modal">
            <div className="title-container">
                <button className="back-arrow" onClick={() => onAddLabel('')}>{taskSvg.arrowBack}</button>
                <p>Create label</p>
                <button onClick={onCloseEditTask} className="close-modal label">{additionTaskSvg.close}</button>
            </div>
            <section className="label-display">
                <div className="label-preview" style={{ backgroundColor: colorSelected }}>{labelTitle}</div>
            </section>
            <section className="edit-modal-content">
                <div className="content">
                    <p className="content-headline">Title</p>

                    <Textarea onChange={onSetTitle} value={labelTitle} sx={{ fontSize: 14, fontWeight: 'medium', borderRadius: '3px', boxShadow: 'inset 0 0 0 1px #091e4224', bgcolor: 'white' }}></Textarea>
                    <p className="content-headline">Select a color</p>
                    <ul className="color-platte clean-list">
                        {labelsColorPickers.map(colorPicker => (
                            <li key={colorPicker}>
                                <button className="color-display" style={{ backgroundColor: colorPicker, width: '50px', height: '30px' }} onClick={() => setColorSelected(colorPicker)}></button>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr />
                <section className="btn-section">
                    {labelToEdit ? (
                        <section className="flex">
                            <button className="label-btn-create clean-btn" onClick={onSaveLabel}>Save</button>
                            <button className="label-btn-create delete clean-btn" onClick={onDeletingLabel}>Delete</button>
                        </section>
                    ) : (
                        <button onClick={onSaveLabel} className="label-btn-create clean-btn">Create</button>
                    )}

                </section>
            </section>
        </section>
    )
}