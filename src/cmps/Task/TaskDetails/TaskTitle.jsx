import { useState } from "react"
import { taskSvg } from "../../Svgs"
import Textarea from '@mui/joy/Textarea';
import { useRef } from "react";

export function TaskTitle({ onSaveTask, task }) {
    const [titleToEdit, setTitleToEdit] = useState(task.title)
    const textareaRef = useRef(null);

    async function onEnterSaveTitle(ev) {
        if (ev.key === 'Enter') {
            textareaRef.current.blur()
            ev.preventDefault()
            try {
                saveTitle()
                console.log('Task title changed successfully');
            } catch (err) {
                console.log('Cannot change task title', err);
            }
        }
    }

    async function onBlurSaveTitle() {
        try {
            saveTitle()
            console.log('Task title changed successfully')
        } catch (err) {
            console.log('Cannot change task title', err)
        }
    }

    async function saveTitle() {
        const newTask = { ...task, title: titleToEdit }
        onSaveTask(newTask)
    }

    function handleChange(event) {
        setTitleToEdit(event.target.value)
    }

    return (

        <section className="task-title">
            {taskSvg.title}
            <Textarea
                ref={textareaRef}
                name="title"
                minRows={1}
                value={titleToEdit}
                onChange={handleChange}
                onBlur={onBlurSaveTitle}
                onKeyDown={onEnterSaveTitle}
                sx={{
                    width: '86%', minHeight: '37px',
                    padding: '6px 10px', margin: '0',
                    border: 'none', background: 'none',
                    boxShadow: 'none', borderBottom: 'none'
                }}
            />
        </section>
    )

}