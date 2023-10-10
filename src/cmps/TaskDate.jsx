import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { taskService } from "../services/task.service.local";
import { appHeaderSvg } from "./Svgs";

export function TaskDate({ taskDate, setEditName }) {
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
        console.log('done')
    }

    return (

        taskDate && (
            <section>
                <p>Due date</p>
                <div className='checkbox'>
                    <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={onCompleteDueDate} />
                </div>
                <p onClick={() => setEditName('Dates')}> <span>{taskDate}</span> {appHeaderSvg.arrowDown}</p>
            </section>
        )
    )
}