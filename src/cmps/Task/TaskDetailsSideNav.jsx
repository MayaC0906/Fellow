import { additionTaskEdiSvg, checkList, taskSvg, workspaceSvg } from "../Svgs";
import { DynamicTaskActions } from "../Dynamic/DynamicTaskActions";
import { useRef, useState } from "react";

export function TaskDetailsSideNav({ editName, setEditName, onSaveTask, task, isQuickEdit, onActionDeleteTask }) {

    const [modalPos, setModalPos] = useState({ top: '', left: '' })
    const memberBtnRef = useRef(null)
    const labelBtnRef = useRef(null)
    const checklistBtnRef = useRef(null)
    const dateBtnRef = useRef(null)
    const attachmentBtnRef = useRef(null)
    const coverBtnRef = useRef(null)

    function onOpenEditTask(name) {
        if (name === editName) {
            onCloseEditTask()
        } else {
            setEditName(name)
            getBounds(name)
        }
    }

    function onCloseEditTask() {
        setEditName('')
    }

    function getBounds(name) {
        switch (name) {
            case 'Member':
                updateModalPos(memberBtnRef, name)
                break;
            case 'Label':
                updateModalPos(labelBtnRef, name)
                break;
            case 'Checklist':
                updateModalPos(checklistBtnRef, name)
                break;
            case 'Dates':
                updateModalPos(dateBtnRef, name)
                break;
            case 'Attachment':
                updateModalPos(attachmentBtnRef, name)
                break;
            case 'Cover':
                updateModalPos(coverBtnRef, name)
                break;
            default:
                setModalPos({
                    top: 0,
                    left: 0
                })
        }
    }

    function updateModalPos(btnRef, name) {
        const rect = btnRef.current.getBoundingClientRect()
        if (name === 'Dates') {
            setModalPos({
                top: - rect.height + 50,
                left: rect.left
            })
        } else if (name === 'Attachment') {
            setModalPos({
                top: rect.top - 50,
                left: rect.left
            })
        } else {
            setModalPos({
                top: rect.top + rect.height + 10,
                left: rect.left
            })
        }
    }

    return (
        <section className="add-container">
            <h3>Add to card</h3>
            <DynamicTaskActions pos={modalPos} onSaveTask={onSaveTask} task={task} editName={editName} onCloseEditTask={onCloseEditTask} />
            <button ref={memberBtnRef} onClick={() => onOpenEditTask('Member')} className="btn">{workspaceSvg.member} <span>{isQuickEdit ? 'Change members' : 'Members'}</span></button>
            <button ref={labelBtnRef} onClick={() => onOpenEditTask('Label')} className="btn">{additionTaskEdiSvg.label}<span>{isQuickEdit ? 'Edit labels' : 'Labels'}</span></button>
            {!isQuickEdit && <button ref={checklistBtnRef} onClick={() => onOpenEditTask('Checklist')} className="btn">{taskSvg.checklist} <span>Checklist</span></button>}
            <button ref={dateBtnRef} onClick={() => onOpenEditTask('Dates')} className="btn">{taskSvg.clock} <span>{isQuickEdit ? 'Edit dates' : 'Dates'}</span></button>
            {!isQuickEdit && <button ref={attachmentBtnRef} onClick={() => onOpenEditTask('Attachment')} className="btn">{additionTaskEdiSvg.attachment} <span>Attachment</span></button>}
            {!task.cover.backgroundColor && !task.cover.img && <button ref={coverBtnRef} onClick={() => onOpenEditTask('Cover')} className="btn">{taskSvg.cover} <span>{isQuickEdit ? 'Change cover' : 'Cover'}</span></button>}
            <button onClick={onActionDeleteTask} className="btn">{checkList.garbage} <span>Delete</span></button>
        </section>
    )

}