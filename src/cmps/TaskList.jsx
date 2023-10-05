import { useState } from "react";
import { boardService } from "../services/board.service.local";
import { TaskPreview } from "./TaskPreview";


export function TaskList({ tasks, labels, members }) {
    const [isLabelsShown, setIsLabelsShown] = useState(false)

    return (
        <section className="task-list">
            {tasks.map(task => {
                const taskLabels = boardService.getLabels(task.labelIds, labels) || null
                const taskMembers = boardService.getMembers(task.memberIds, members) || null
                const taskChecklist = task.checklists.length ? boardService.getCheckListStatus(task.checklists) : ''

                return <TaskPreview
                    setIsLabelsShown={setIsLabelsShown}
                    isLabelsShown={isLabelsShown}
                    task={task}
                    taskLabels={taskLabels}
                    taskMembers={taskMembers}
                    taskChecklist={taskChecklist}
                />
            })}
        </section>
    )
}