import { additionTaskEdiSvg, taskSvg } from "../Svgs";
import { DynamicTaskActions } from "../Dynamic/DynamicTaskActions";

export function TaskDetailsSideNav({ editName, setEditName, setTask, onSaveTask, task }) {

    function onOpenEditTask(name) {
        setEditName(name)
    }

    function onCloseEditTask() {
        setEditName('')
    }

    return (
        <section className="add-container">
            <h3>Add to card</h3>
            <DynamicTaskActions onSaveTask={onSaveTask} task={task} editName={editName} onCloseEditTask={onCloseEditTask} setTask={setTask} />
            <button onClick={() => onOpenEditTask('Member')} className="btn">{additionTaskEdiSvg.member} <span>Members</span></button>
            <button onClick={() => onOpenEditTask('Label')} className="btn">{additionTaskEdiSvg.label} <span>Labels</span></button>
            <button onClick={() => onOpenEditTask('Checklist')} className="btn">{taskSvg.checklist} <span>Checklist</span></button>
            <button onClick={() => onOpenEditTask('Dates')} className="btn">{taskSvg.clock} <span>Dates</span></button>
            <button onClick={() => onOpenEditTask('Attachment')} className="btn">{additionTaskEdiSvg.attachment} <span>Attachment</span></button>
            {!task.cover.backgroundColor&&!task.cover.img&&<button onClick={() => onOpenEditTask('Cover')} className="btn">{taskSvg.cover} <span>Cover</span></button>}
        </section>
    )

}