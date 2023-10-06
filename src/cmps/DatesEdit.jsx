import { DateCalendar } from '@mui/x-date-pickers'
import { additionTaskSvg } from './Svgs'
import { DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateTimeFieldValue from './DueDate';
import { useState } from 'react';



export function DatesEdit({ editName, onCloseEditTask }) {
    const [dateTime, setTimeDate] = useState('03/04/96')


    return (
        <section className="edit-modal">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <div className="content">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Controlled calendar">
                            <DateCalendar value={dateTime} onChange={(newValue) => setTimeDate(newValue)} />
                        </DemoItem>
                    </LocalizationProvider>
                    {/* <div>
                        due date: <DateTimeFieldValue
                            label="Controlled field"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </div> */}
                </div>
            </section>
        </section>
    )
}