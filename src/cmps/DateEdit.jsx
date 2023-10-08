import { DateCalendar, DateField, DatePicker, TimeField } from '@mui/x-date-pickers'
import { additionTaskSvg } from './Svgs'
// import { DemoItem } from '@mui/x-date-pickers/internals/demo'
// import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import DateTimeFieldValue from './DueDate';
import { useState } from 'react';
// import { auto } from '@popperjs/core';
import { BasicDateField } from './DueDate'
import { BasicTimeField } from './DueTime'
import { useParams } from 'react-router';



export function DateEdit({ editName, onCloseEditTask }) {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)

    const { boardId, groupId, taskId } = useParams()
    console.log(boardId, groupId, taskId);

    function onSaveDate() {
        console.log(selectedDate)

    }

    function onSaveTime() {
        console.log(selectedDate)

    }
    // console.log(selectedDate.$d)
    // console.log(selectedTime)
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
                            <TimeField sx={{ width: 108 }} value={selectedTime} onChange={(time) => setSelectedTime(time)} />
                        </div>
                    </LocalizationProvider>
                    <div className='action-btn'>
                        <button onClick={onSaveDate}>Save</button>
                        <button onClick={onSaveTime}>Remove</button>
                    </div>
                </div>
            </section>
        </section>
    )
}