import { useState } from "react"
import { taskSvg } from "./Svgs"
import { useParams } from "react-router"
import { saveTaskTitle } from "../store/actions/board.actions"
import Textarea from '@mui/joy/Textarea';

export function TaskTitle({ task }) {
    const [titleToEdit, setTitleToEdit] = useState(task.title)
    const { boardId, groupId, taskId } = useParams()

    async function onSaveTitle(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            try {
                const task = await saveTaskTitle(boardId, groupId, taskId, titleToEdit)
                console.log('Task title changed successfully');
            } catch (err) {
                console.log('Cannot change task title', err);
            }
        }
    }
    function handleChange(event) {
        setTitleToEdit(event.target.value)
    }

    return (

        <section className="task-title">
            {taskSvg.title}
            <Textarea
                name="title"
                minRows={1}
                value={titleToEdit}
                onChange={handleChange}
                onBlur={onSaveTitle}
                onKeyDown={onSaveTitle}
                sx={{ width: '78.125%', minHeight: '37px', padding: '6px 10px', margin: '0', border: 'none' }}
            />
        </section>
    )

}