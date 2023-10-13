import { DateCalendar, DateField, DatePicker, TimeField } from '@mui/x-date-pickers'
import { additionTaskSvg } from './Svgs'
// import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import DateTimeFieldValue from './DueDate';
import { useEffect, useState } from 'react'
// import { auto } from '@popperjs/core';
import { BasicDateField } from './DueDate'
import { BasicTimeField } from './DueTime'
import { useParams } from 'react-router'
import { Button } from '@mui/joy'
import { loadTask, removeDueDate, saveTaskDueDate } from '../store/actions/board.actions'
import { boardService } from '../services/board.service.local'



export function DateEdit({ editName, onCloseEditTask, setTask }) {
    const [selectedDate, setSelectedDate] = useState(null)
    const { boardId, groupId, taskId } = useParams()

    useEffect(() => {
        onLoadDueDate(boardId, groupId, taskId)
    }, [])

    async function onLoadDueDate(boardId, groupId, taskId) {
        try {
            const task = await loadTask(boardId, groupId, taskId)
            const dueDate = task.dueDate
            if (dueDate) {
                const formattedDate = dayjs(dueDate, 'MMM D, YYYY [at] h:mm A')
                setSelectedDate(formattedDate);
            }
        } catch (err) {
            console.log('Can not load due date', err)
        }
    }

    async function onSaveDate() {
        if (selectedDate === null) return
        const formatedDate = selectedDate.format('MMM D, YYYY [at] h:mm A')
        try {
            await saveTaskDueDate(boardId, groupId, taskId, formatedDate)
            setTask(prevTask => ({ ...prevTask, dueDate: formatedDate }))
            setSelectedDate(selectedDate)
            onCloseEditTask('')
        } catch (err) {
            console.log('Could not save date =>', err)
        }
    }

    async function onRemoveDate() {
        try {
            await removeDueDate(boardId, groupId, taskId)
            setTask(prevTask => ({ ...prevTask, dueDate: null }))
            onCloseEditTask('')
        } catch (err) {
            console.log('Cannot remove due date', err)
        }
    }

    return (
        <section className="edit-modal">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <div className="content">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <DateCalendar value={selectedDate}
                            onChange={(date) => setSelectedDate(date)} sx={{ width: 280 }} />
                        <div className='due-date'>
                            <p>Due date</p>
                            {/* <DateTimeFieldValue
                                label="Controlled field"
                                value={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                            /> */}
                            {/* <DatePicker value={selectedDate}
                                onChange={(date) => setSelectedDate(date)} /> */}
                            <DateField sx={{ width: 108 }} value={selectedDate}
                                onChange={(date) => setSelectedDate(date)} />
                            <TimeField sx={{ width: 108 }} value={selectedDate} onChange={(time) => setSelectedDate(time)} />
                        </div>
                    </LocalizationProvider>
                    <div className='action-btn'>
                        <Button className='btnn' variant="contained" onClick={onSaveDate}
                            sx={{
                                color: '#ffff',
                                borderRadius: 1,
                                bgcolor: '#0C66E4',
                                '&:hover': {
                                    bgcolor: '#0850c9'
                                },
                            }}>
                            Save
                        </Button>

                        <Button variant="contained" onClick={onRemoveDate}
                            sx={{
                                color: '#000000',
                                borderRadius: 1,
                                bgcolor: ' #091e420f',
                                '&:hover': {
                                    bgcolor: ' #091e4224'
                                },
                            }}>
                            Remove
                        </Button>
                    </div>
                </div>
            </section>
        </section >
    )
}

