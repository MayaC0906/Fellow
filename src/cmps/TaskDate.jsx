import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { taskService } from "../services/task.service.local";
import { appHeaderSvg } from "./Svgs";

export function TaskDate({ taskDate, setEditName }) {
    const [isDateCompleted, SetIsDateCompleted] = useState(false)
    const [isOpenningDate, setIsOpenningDate] = useState(false)
    const { boardId, groupId, taskId } = useParams()


    // useEffect(() => {
    //     onLoadTask()
    // }, [open])

    // async function onLoadTask() {
    //     const task = await taskService.getById(boardId, groupId, taskId)
    //     console.log(task);
    // }

    // console.log(taskDate);
    function onCompleteDueDate() {
        SetIsDateCompleted(!isDateCompleted)
    }

    function toggleOpenningDate() {
        setIsOpenningDate(!isOpenningDate);
        setEditName(isOpenningDate ? 'Dates' : '');
    }

    return (

        taskDate && (
            <section>
                <p>Due date</p>
                <div className='checkbox'>
                    <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={onCompleteDueDate} />
                </div>
                <p onClick={toggleOpenningDate}>
                    <span>{taskDate}</span>
                    {isDateCompleted && (<span>completed</span>)}
                    {appHeaderSvg.arrowDown}</p>
            </section>
        )
    )
}