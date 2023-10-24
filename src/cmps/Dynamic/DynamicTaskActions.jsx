import { MemberEdit } from './MemberEdit';
import { ChecklistEdit } from './ChecklistEdit';
import { DateEdit } from './Date/DateEdit';
import { LabelEdit } from './Label/LabelEdit';
import { AttachmentEdit } from './Attachment/AttachmentEdit';

export function DynamicTaskActions(props) {
    switch (props.editName) {
        case 'Member':
            return <MemberEdit {...props} />
        case 'Label':
            return <LabelEdit {...props} />
        case 'Checklist':
            return <ChecklistEdit {...props} />
        case 'Dates':
            return <DateEdit {...props} />
        case 'Attachment':
            return <AttachmentEdit {...props} />
        default:
            return null;
    }
}