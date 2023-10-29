export function generateActivityText(action, memberName, optionalDetails) {
    switch(action) {
        case 'ADD_TASK':
            return `${memberName} added a new task titled '${optionalDetails.taskTitle}' to group '${optionalDetails.groupTitle}'.`;
        case 'CHANGE_BG':
            return `${memberName} changed the background of the board.`;
        case 'UPDATE_DESC':
            return `${memberName} updated the description of task '${optionalDetails.taskTitle}'.`;
        default:
            return '';
    }
}
