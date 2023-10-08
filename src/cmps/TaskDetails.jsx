import { useParams } from "react-router"
import { loadTask } from "../store/actions/board.actions"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TaskTitle } from "./TaskTitle"
import { TaskDescription } from "./TaskDescription"
import { TaskDetailsSideNav } from "./TaskDetailsSideNav"
import { taskSvg } from "./Svgs"
import { TaskAttachments } from "./TaskAttachments"


export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    const [task, setTask] = useState(null)
    let [editName, setEditName] = useState('')

    useEffect(() => {
        onLoadTask(boardId, groupId, taskId)
    }, [])

    async function onLoadTask(boardId, groupId, taskId) {
        console.log('loadTask');
        try {
            const newTask = await loadTask(boardId, groupId, taskId)
            console.log('newTask', newTask);
            setTask({ ...newTask })
        } catch (err) {
            console.log('Can\'t load board', err);
            throw err
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


                    <TaskTitle taskTitle={task.title} />

                    <section className="task-main">
                        <section className="task-info">
                            <TaskDescription taskDescription={task.description} />
                            <TaskAttachments
                                setEditName={setEditName}
                                taskAttachments={task.attachments}
                                cover={task.cover}
                                setTask={setTask}
                            />
                        </section>

                        <section className="edit-task-nav">
                            <TaskDetailsSideNav editName={editName} setEditName={setEditName} />
                        </section>
                    </section>

                </article>
            </section>
        </div>
    )

}