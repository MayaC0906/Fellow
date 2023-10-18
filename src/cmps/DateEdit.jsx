import { DateCalendar, DateField, DatePicker, TimeField } from '@mui/x-date-pickers'
import { additionTaskSvg } from './Svgs'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useRef, useState } from 'react'
import { BasicDateField } from './DueDate'
import { BasicTimeField } from './DueTime'
import { useParams } from 'react-router'
import { Button } from '@mui/joy'
import { loadTask, removeDueDate, saveTaskDueDate } from '../store/actions/board.actions'
import { Checkbox } from '@mui/material'



export function DateEdit({ editName, onCloseEditTask, setTask }) {
    const [selectedDate, setSelectedDate] = useState(null)
    const [isDateSelected, setIsDateSelected] = useState(false)
    const { boardId, groupId, taskId } = useParams()
    let lastDate = useRef(null)

    useEffect(() => {
        onLoadDueDate(boardId, groupId, taskId)
    }, [])

    async function onLoadDueDate(boardId, groupId, taskId) {
        try {
            const task = await loadTask(boardId, groupId, taskId)
            const dueDate = task.dueDate
            console.log('duedate', dueDate);
            if (dueDate) {
                const formattedDate = dayjs(dueDate, 'MMM D [at] h:mm A')
                setSelectedDate(formattedDate)
                lastDate.current = formattedDate
                setIsDateSelected(true)
            } else {
                setIsDateSelected(false)
            }
        } catch (err) {
            console.log('Can not load due date', err)
        }
    }

    function onSetSelectedDate(date) {
        setSelectedDate(date)
        lastDate.current = date
        setIsDateSelected(true)
    }

    async function onSaveDate() {
        if (selectedDate === null) return
        const formatedDate = selectedDate.format('MMM D [at] h:mm A')
        try {
            await saveTaskDueDate(boardId, groupId, taskId, formatedDate)
            setTask(prevTask => ({ ...prevTask, dueDate: formatedDate }))
            setSelectedDate(selectedDate)
            setIsDateSelected(true)
            onCloseEditTask('')
        } catch (err) {
            console.log('Could not save date =>', err)
        }
    }

    async function onRemoveDate() {
        try {
            await removeDueDate(boardId, groupId, taskId)
            setTask(prevTask => ({ ...prevTask, dueDate: null }))
            setIsDateSelected(false)
            onCloseEditTask('')
        } catch (err) {
            console.log('Cannot remove due date', err)
        }
    }

    function onToggleChecked() {
        if (isDateSelected) {
            setIsDateSelected(false)
            setSelectedDate(null)
        } else {
            setIsDateSelected(true)
            setSelectedDate(lastDate.current)
        }
    }

    console.log('lastDate', lastDate);
    console.log('isDateSelected', isDateSelected);
    console.log('selectedDate', selectedDate);
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
                            onChange={(date) => onSetSelectedDate(date)} sx={{
                                width: 280,
                                "& .MuiPickersDay-root": {
                                    '&:hover': {
                                        bgcolor: 'rgba(9, 30, 66, 0.06)',
                                        borderRadius: 0,
                                    },
                                    fontSize: 14,
                                    "&.Mui-selected": {
                                        color: '#0C66E4',
                                        bgcolor: '#e9f2ff',
                                        borderRadius: 0,
                                        '&:active': {
                                            bgcolor: '#DEEBFF',
                                            borderRadius: 0,
                                        },
                                        '&:focus': {
                                            bgcolor: '#e9f2ff',
                                        },
                                    },
                                    '&.MuiPickersDay-today': {
                                        color: '#0C66E4',
                                        borderRadius: 0,
                                        border: 'none',
                                        borderBottom: '2px solid #0C66E4',
                                    },
                                },
                            }}
                        />
                        <div className='due-date'>
                            <p style={isDateSelected ? { color: '#0c66e4' } : {}}>Due date</p>
                            <section className='due-date-details flex align-center'>
                                <Checkbox checked={isDateSelected} onChange={onToggleChecked}
                                    sx={{
                                        p: 0, mr: 1, fontSize: 12, width: 16, height: 16,
                                        '&.MuiSvgIcon-root': {
                                            fontSize: 12,
                                        },
                                    }} />
                                <DateField sx={{
                                    width: 95, mr: 1, fontSize: 14,
                                    '&:hover': {
                                        border: 0
                                    },
                                    // "& .MuiPickersDay-root": {
                                    //     borderColor: '#0c66e4',
                                    // },
                                    input: { cursor: isDateSelected ? 'pointer' : 'not-allowed' }
                                }} value={selectedDate}
                                    onChange={(date) => setSelectedDate(date)} />
                                <TimeField sx={{
                                    width: 90, fontSize: 14,
                                    input: { cursor: isDateSelected ? 'pointer' : 'not-allowed' }
                                }} value={selectedDate} onChange={(time) => setSelectedDate(time)} />
                            </section>
                        </div>
                    </LocalizationProvider>
                    <div className='action-btn'>
                        <Button className='btnn' variant="contained" onClick={onSaveDate}
                            sx={{
                                mb: 1,
                                mt: 1.5,
                                color: '#ffff',
                                borderRadius: 1,
                                bgcolor: '#0C66E4',
                                '&:hover': {
                                    bgcolor: '#0850c9'
                                },
                                '&:active': {
                                    bgcolor: '#09326c'
                                }
                            }}>
                            Save
                        </Button>

                        <Button variant="contained" onClick={onRemoveDate}
                            sx={{
                                color: '#000000',
                                borderRadius: 1,
                                bgcolor: ' #091e420f',
                                '&:hover': {
                                    bgcolor: '#091e4224'
                                },
                                '&:active': {
                                    bgcolor: '#091E424F'
                                }
                            }}>
                            Remove
                        </Button>
                    </div>
                </div>
            </section >
        </section >
    )
}

