
import { boardService } from "../services/board.service.local";
import { TaskPreview } from "./TaskPreview";
import { useParams } from "react-router";


export function TaskList({ tasks, labels, members, isLabelsShown, setIsLabelsShown, groupId }) {

    const {boardId} = useParams()

    return (
        <section className="task-list">
            {tasks.map(task => {
                const taskLabels = boardService.getLabels(task.labelIds, labels) || null
                const taskMembers = boardService.getMembers(task.memberIds, members) || null
                const taskChecklist = task.checklists.length ? boardService.getCheckListStatus(task.checklists) : ''

                return <Link to = {`board/${boardId}/${groupId}/${task.id}`}><TaskPreview
                    setIsLabelsShown={setIsLabelsShown}
                    isLabelsShown={isLabelsShown}
                    task={task}
                    taskLabels={taskLabels}
                    taskMembers={taskMembers}
                    taskChecklist={taskChecklist}
                />
                </Link>
            })}
        </section>
    )
}