import { useParams } from "react-router"
import { loadTask } from "../store/actions/board.actions"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TaskTitle } from "./TaskTitle"

export function TaskDetails() {

    const { boardId, groupId, taskId } = useParams()
    const [task, setTask] = useState(null)
    console.log(task);

    useEffect(() => {
        onLoadTask(boardId, groupId, taskId)
    }, [])

    async function onLoadTask(boardId, groupId, taskId) {
        try {
            const task = await loadTask(boardId, groupId, taskId)
            setTask(task)
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
                    <Link to={`/board/${boardId}`}>X</Link>
                    {task.cover?.backgroundColor && <div style= {{backgroundColor: task.cover.backgroundColor}}></div>} 
                    {/* 116px */}
                    {task.cover?.img && <img src={task.cover.img} alt="" /> } 
                    {/* maxwidth 16px */}
                    <TaskTitle task={task}/>
                </article>
            </section>
            <div className="layer"></div>
        </div>
    )

}