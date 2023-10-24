import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { appHeaderSvg } from "../../Svgs";
import dayjs from "dayjs";

export function TaskDate({ taskDate, setEditName, editName }) {
    const [isDateCompleted, SetIsDateCompleted] = useState(false)
    const [isDateOverdue, setIsDateOverdue] = useState(false)

    useEffect(() => {
        const taskDueDate = dayjs(taskDate, 'MMM D [at] h:mm A').format('YYYY-MM-DD')
        const inputDate = new Date(`${taskDueDate}`);
        const currentDate = new Date();
        if (inputDate < currentDate) setIsDateOverdue(true)
        else setIsDateOverdue(false)
    }, [taskDate])

    function onCompleteDueDate() {
        SetIsDateCompleted(!isDateCompleted)
    }

    function toggleDateDisplay() {
        if (editName === 'Dates') setEditName('')
        else if (editName === '') setEditName('Dates')
    }

    return (

        taskDate && (
            <section className="task-display">
                <h2 className="task-date-title">Due date</h2>
                <section className="task-display flex align-center">

                    <div className='checkbox'>
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 }, p: 0, mr: 0.2 }} onClick={onCompleteDueDate} />
                    </div>
                    <div className={`task-date flex align-center ${isDateCompleted ? 'complete-open' : ''}`} onClick={toggleDateDisplay}>
                        <span className="task-date-data">{taskDate}</span>
                        {isDateCompleted && (<span className="task-date-complete flex align-center">Complete</span>)}
                        {isDateOverdue && !isDateCompleted && (<span className="task-date-complete overdue flex align-center">Overdue</span>)}
                        {appHeaderSvg.arrowDown}
                    </div>
                </section>
            </section>
        )
    )
}