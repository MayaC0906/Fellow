// import * as React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
// import { useState } from 'react';

// export default function DateTimeFieldValue({ value, onChange }) {
//     // console.log(time);
//     // const [value, setValue] = useState(dayjs('2022-04-17T15:30'));

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer components={['DateTimeField', 'DateTimeField']}>
//                 <DateTimeField
//                     label="Controlled field"
//                     value={value}
//                     onChange={(newValue) => onChange(newValue)}
//                 />
//             </DemoContainer>
//         </LocalizationProvider>
//     );
// }


// import * as React from 'react';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// export function ControlledComponent({ value, onChange }) {

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer components={['DatePicker']}>
//                 <DatePicker value={value} onChange={(newValue) => onChange(newValue)} />
//             </DemoContainer>
//         </LocalizationProvider>
//     );
// }

import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export function BasicDateField({ value, onChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
                <DateField value={value} onChange={(newValue) => onChange(newValue)} />
            </DemoContainer>
        </LocalizationProvider>
    );
}