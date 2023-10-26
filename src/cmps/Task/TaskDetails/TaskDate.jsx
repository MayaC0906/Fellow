import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { appHeaderSvg } from "../../Svgs";
import dayjs from "dayjs";

export function TaskDate({ task, setEditName, editName, onSaveTask }) {
    const { dueDate } = task
    const [isComplete, setIsComplete] = useState(dueDate.isComplete)
    const [isOverdue, setIsOverdue] = useState(dueDate.isOverdue)

    useEffect(() => {
        onSettingIsOverdue()
    }, [dueDate.date])

    async function onSettingIsOverdue() {
        const taskDueDate = dayjs(dueDate.date, 'MMM D [at] h:mm A').format('YYYY-MM-DD')
        const inputDate = new Date(`${taskDueDate}`);
        const currentDate = new Date();
        if (inputDate < currentDate) {
            dueDate.isOverdue = true
        } else {
            dueDate.isOverdue = false
        }
        setIsOverdue(dueDate.isOverdue)
        onSaveTask(task)
    }

    function onCompleteDueDate() {
        dueDate.isComplete = !dueDate.isComplete
        setIsComplete(dueDate.isComplete)
        onSaveTask(task)
    }

    function toggleDateDisplay() {
        if (editName === 'Dates') setEditName('')
        else if (editName === '') setEditName('Dates')
    }

    return (

        dueDate.date && (
            <section className="task-display">
                <h2 className="task-date-title">Due date</h2>
                <section className="task-display flex align-center">

                    <div className='checkbox'>
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 }, p: 0, mr: 0.2 }} onClick={onCompleteDueDate} checked={dueDate.isComplete} />
                    </div>
                    <div className={`task-date flex align-center ${dueDate.isComplete ? 'complete-open' : ''}`} onClick={toggleDateDisplay}>
                        <span className="task-date-data">{dueDate.date}</span>
                        {isComplete && (<span className="task-date-complete flex align-center">Complete</span>)}
                        {isOverdue && !isComplete && (<span className="task-date-complete overdue flex align-center">Overdue</span>)}
                        {appHeaderSvg.arrowDown}
                    </div>
                </section>
            </section>
        )
    )
}