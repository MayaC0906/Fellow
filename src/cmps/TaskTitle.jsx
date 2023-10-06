import { useEffect, useState } from "react"
import { taskSvg } from "./Svgs"
import { useParams } from "react-router"
import { saveTaskTitle } from "../store/actions/board.actions"
import Textarea from '@mui/joy/Textarea';

export function TaskTitle({ task }) {
    const [titleToEdit, setTitleToEdit] = useState(task.title)
    const { boardId, groupId, taskId } = useParams()

    async function onSaveTitle() {
        console.log(boardId, 'fromtaskTitle');
        try {
            const task = await saveTaskTitle(boardId, groupId, taskId, titleToEdit)
            console.log('Task title changed successfully');
        } catch (err) {
            console.log('Cannot change task title', err);
        }
    }

    function handleChange(event) {
        setTitleToEdit(event.target.value)
    }

    return (

        <section className="task-detail-title">
            {taskSvg.title}
            <form onSubmit={onSaveTitle}>
            <Textarea
                name="title"
                autoFocus
                minRows={1}
                value={titleToEdit}
                onChange={handleChange}
                onBlur={onSaveTitle}
                sx={{ width: '600px', minHeight: '37px', padding: '6px 10px', margin: '0', border: 'none' }}
            />
            </form>
        </section>
    )

}