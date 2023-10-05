import { useParams } from "react-router"
import { loadTask } from "../store/actions/board.actions"
import { useEffect, useState } from "react"

export function TaskDetails() {

    const { boardId, groupId, taskId } = useParams()
    const [task, setTask] = useState(null)

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
    return (
        <div className="task-details">

        </div>
    )
}