import { additionTaskEdiSvg, taskSvg } from "./Svgs";
import { DynamicTaskEdit } from "./DynamicTaskEdit";

export function TaskDetailsSideNav({ editName, setEditName, setTask }) {

    function onOpenEditTask(name) {
        setEditName(name)
    }

    function onCloseEditTask() {
        setEditName('')
    }

    return (
        <section className="add-container">
            <h3>Add to card</h3>
            <DynamicTaskEdit editName={editName} onCloseEditTask={onCloseEditTask} setTask={setTask} />
            <button onClick={() => onOpenEditTask('Member')} className="btn">{additionTaskEdiSvg.member} <span>Members</span></button>
            <button onClick={() => onOpenEditTask('Label')} className="btn">{additionTaskEdiSvg.label} <span>Labels</span></button>
            <button onClick={() => onOpenEditTask('Checklist')} className="btn">{taskSvg.checklist} <span>Checklist</span></button>
            <button onClick={() => onOpenEditTask('Dates')} className="btn">{taskSvg.clock} <span>Dates</span></button>
            <button onClick={() => onOpenEditTask('Attachment')} className="btn">{additionTaskEdiSvg.attachment} <span>Attachment</span></button>
        </section>
    )

}