import { boardService } from "../services/board.service.local";
import { utilService } from "../services/util.service";
import { taskSvg } from "./Svgs";


export function TaskList({ tasks, labels, members }) {
    console.log('tasks:', tasks);
    console.log('members:', members);


    return (
        tasks.map(task => {
            const taskLabels = boardService.getLabels(task.labelIds, labels) || null
            const taskMembers = boardService.getMembers(task.memberIds, members) || null
            const taskChecklist = task.checklists.length ? boardService.getCheckListStatus(task.checklists) : ''

            return (
                <article key={task.id} className="task">
                    <div>{taskSvg.edit}</div>
                    {task.cover.backgroundColor && <div className="task-cover" style={{ backgroundColor: task.cover.backgroundColor }}></div>}
                    {task.cover.img && <img className="task-cover" src={task.cover.img} alt="" />}
                    <section className="labels">
                        {taskLabels.map(label => {
                            return <div key={label.id} className="label" style={{ backgroundColor: label.color }} >
                                {label.title && <span>{label.title}</span>} </div>
                        })}
                    </section>
                    <h3>{task.title}</h3>
                    {task.dueDate && <div>{taskSvg.clock}<span>{utilService.formatTimestamp(task.dueDate)}</span></div>}
                    {task.description && <div>{taskSvg.description}</div>}
                    {task.comments.length && <div>{taskSvg.comment} <span>{task.comments.length}</span></div>}
                    {task.attachments.length && <div>{taskSvg.attatchment} <span>{task.attachments.length}</span></div>}
                    {task.checklists.length && <div>{taskSvg.checklist}
                        <span>{taskChecklist.done}/{taskChecklist.all}</span></div>}
                    {task.memberIds.length &&
                        <section className="task-members">
                            {taskMembers.map(member => <img key={member._id} src={member.imgUrl} alt="" />)}
                        </section>
                    }
                </article>
            )
        })
    )
}