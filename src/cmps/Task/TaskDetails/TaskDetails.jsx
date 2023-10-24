import { useParams } from "react-router"
import { loadTask } from "../../../store/actions/board.actions"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TaskTitle } from "./TaskTitle"
import { TaskDescription } from "./TaskDescription"
import { TaskDetailsSideNav } from "../TaskDetailsSideNav"
import { taskSvg } from "../../Svgs"
import { TaskAttachments } from "./TaskAttachments"
import { useSelector } from 'react-redux'
import { saveNewTask } from "../../../store/actions/board.actions"

import { TaskCheckList } from "./TaskChecklist-list"
import { TaskDate } from "./TaskDate"
import { TaskMember } from "./TaskMember"
import { TaskLabel } from "./TaskLabel"

export function TaskDetails() {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const { boardId, groupId, taskId } = useParams()
    const [task, setTask] = useState('')
    let [editName, setEditName] = useState('')

    useEffect(() => {
        onLoadTask(boardId, groupId, taskId)
    }, [])

    async function onLoadTask(boardId, groupId, taskId) {
        try {
            const newTask = await loadTask(boardId, groupId, taskId)
            setTask(newTask)
        } catch (err) {
            console.log('Can\'t load board', err);
            throw err
        }
    }

    async function onSaveTask(updatedTask) {
        try {
            setTask(updatedTask)
            await saveNewTask(boardId, groupId, updatedTask)
        } catch (err) {
            console.log('cant save task');
        }
    }

    if (!task) return <div>Loading</div>
    return (
        <div className="task-details">
            <section className="modal-container">
                <article className="task-modal">

                    <Link to={`/board/${boardId}`}>
                        {taskSvg.plus}
                    </Link>

                    {task.cover?.backgroundColor && <div className="color-cover" style={{ backgroundColor: task.cover.backgroundColor }}></div>}
                    {task.cover?.img &&
                        <div className="img-cover">
                            <img src={task.cover.img} alt="" />
                        </div>}


                    <TaskTitle onSaveTask={onSaveTask} task={task} />

                    <section className="task-items-display flex align-center">
                        <TaskMember
                            taskMembersId={task.memberIds}
                            setEditName={setEditName}
                            editName={editName}
                            onSaveTask={onSaveTask}
                            task={task}
                        />
                        <TaskLabel
                            taskLabelsId={task.labelIds}
                            setEditName={setEditName}
                            editName={editName}
                        />
                    </section>

                    {task.dueDate && (
                        <section className="task-date-show">
                            <TaskDate
                                taskDate={task.dueDate}
                                setEditName={setEditName}
                                editName={editName}
                            />
                        </section>
                    )}

                    <section className="task-main">
                        <section className="task-info">
                            <TaskDescription
                                onSaveTask={onSaveTask}
                                task={task} />
                            <TaskAttachments
                                setEditName={setEditName}
                                onSaveTask={onSaveTask}
                                task={task}
                            />
                        </section>



                        <section className="edit-task-nav">
                            <TaskDetailsSideNav
                                setTask={setTask}
                                editName={editName}
                                setEditName={setEditName}
                                onSaveTask={onSaveTask}
                                task={task}
                            />
                        </section >



                        <section>
                            <TaskCheckList
                                setTask={setTask}
                                setEditName={setEditName}
                                // checklists={task.checklists}
                                onSaveTask={onSaveTask}
                                task={task}
                            />
                        </section>
                    </section >

                </article >
            </section >
        </div >
    )

}