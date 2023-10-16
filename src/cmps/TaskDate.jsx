import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { taskService } from "../services/task.service.local";
import { appHeaderSvg } from "./Svgs";

export function TaskDate({ taskDate, setEditName }) {
    const [isDateCompleted, SetIsDateCompleted] = useState(false)
    const [isOpenningDate, setIsOpenningDate] = useState(false)
    const { boardId, groupId, taskId } = useParams()

    function onCompleteDueDate() {
        SetIsDateCompleted(!isDateCompleted)
    }

    function toggleOpenningDate() {
        setIsOpenningDate(!isOpenningDate);
        setEditName(isOpenningDate ? 'Dates' : '');
    }

    return (

        taskDate && (
            <section className="task-display">
                <h2 className="task-date-title">Due date</h2>
                <section className="task-display flex align-center">

                    <div className='checkbox'>
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 }, p: 0, mr: 0.2 }} onClick={onCompleteDueDate} />
                    </div>
                    <div className={`task-date flex align-center ${isDateCompleted ? 'complete-open' : ''}`} onClick={toggleOpenningDate}>
                        {/* <div className="task-date flex align-center" onClick={toggleOpenningDate}> */}
                        <span className="task-date-data">{taskDate}</span>
                        {isDateCompleted && (<span className="task-date-complete flex align-center">Complete</span>)}
                        {appHeaderSvg.arrowDown}
                    </div>
                </section>
            </section>
        )
    )
}