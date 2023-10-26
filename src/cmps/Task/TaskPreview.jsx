import dayjs from "dayjs"
import { taskSvg } from "../Svgs"
import { saveNewTask } from "../../store/actions/board.actions"
import { useParams } from "react-router"
import { darken } from 'polished';

export function TaskPreview({ task, setIsLabelsShown, isLabelsShown, taskLabels, taskMembers, taskChecklist, groupId }) {
    const { dueDate } = task
    const { boardId } = useParams()

    function onLabelOpen(ev) {
        ev.preventDefault()
        setIsLabelsShown(!isLabelsShown)
    }

    async function onCompleteDueDate(ev) {
        ev.preventDefault()
        dueDate.isComplete = !dueDate.isComplete
        try {
            await saveNewTask(boardId, groupId, task)
        } catch (err) {
            console.log(`Couldn't save task`, err);
        }
    }

    if (!task) return <div>Loading...</div>


    return (
        <article key={task.id} className="task">
            <button><span className="icon-badge">{taskSvg.pencil}</span></button>
            {task.cover?.backgroundColor && <div className="task-cover" style={{ backgroundColor: task.cover.backgroundColor }}></div>}
            {task.cover?.img && <img className="task-cover" src={task.cover.img} alt="" />}

            <section className="task-info">
                <section className="labels">
                    {taskLabels.map(label => {
                        return <div key={label.id} className={"label " + (isLabelsShown ? 'open' : 'close')} style={{ backgroundColor: label.color}}
                            onClick={onLabelOpen} >
                            {label.title && <span className="label-title" style={{color: darken(0.4, label.color)}}>{label.title}</span>} </div>
                    })}
                </section>
                <h3>{task?.title}</h3>
                <section className="task-badges">
                    {task.watching && <div className="task-badge"><span className="icon-badge">{taskSvg.watch}</span></div>}

                    {dueDate.date && <div className={`task-badge duedate ${dueDate.isComplete ? 'complete' : ''} ${dueDate.isOverdue && !dueDate.isComplete ? 'overdue' : ''}`} onClick={(e) => onCompleteDueDate(e)}>
                        <span className="clock icon-badge">{taskSvg.clock}</span>
                        {dueDate.isComplete ? <span className="checklist icon-badge">{taskSvg.checklist}</span> : <span className="empty-square icon-badge">{taskSvg.square}</span>}
                        <span className="date-data number-badge">{dayjs(dueDate.date, 'MMM D [at] h:mm A').format('MMM D, YYYY')}</span>
                    </div>}

                    {task.description && <div className="task-badge"> <span className="icon-badge">{taskSvg.description}</span></div>}
                    {task.comments?.length > 0 && <div className="task-badge"><span className="icon-badge">{taskSvg.comment}</span> <span className="number-badge">{task.comments.length}</span></div>}
                    {task.attachments?.length > 0 && <div className="task-badge"> <span className="icon-badge">{taskSvg.attatchment}</span> <span className="number-badge">{task.attachments.length}</span></div>}
                    {task.checklists?.length > 0 && <div className={"task-badge " + (taskChecklist.done === taskChecklist.all ? 'complete' : '')}><span className="icon-badge">{taskSvg.checklist}</span>
                        <span className="number-badge">{taskChecklist.done}/{taskChecklist.all}</span></div>}
                </section>

                {task.memberIds?.length > 0 &&
                    <section className="task-members">
                        {taskMembers.map(member => <img key={member._id} className="member" src={member.imgUrl} alt="" />)}
                    </section>
                }
            </section>
        </article>
    )
}