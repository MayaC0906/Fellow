import { boardService } from "./board.service.local"
import { utilService } from "./util.service"
export const taskService = {
    getById,
    saveTask,
    getDefaultTodo,
    saveTaskDueDateTime,
    removeDueDate,
    toggleMemberOrLabel,
    getEmptyTask,
    deleteLabelOrMember,
    getEmptyChecklist
}

async function getById(boardId, groupId, taskId) {
    try {
        const group = await boardService.getGroupById(groupId, boardId)
        const task = group.tasks.find(task => task.id === taskId)
        return task
    } catch (err) {
        console.log('couldn\'t get task', err);
        throw err
    }
}

async function saveTask(boardId, groupId, newTask) {
    console.log(boardId, groupId, newTask);
        try {
            let group = await boardService.getGroupById(groupId, boardId)
            console.log('group', group);
            if (newTask.id) {
                const taskIdx = group.tasks.findIndex(task => task.id === newTask.id)
                console.log('taskIdx',  taskIdx);
                group.tasks[taskIdx] = newTask
                console.log('task',  group.tasks[taskIdx]);
            } else {
                console.log('hi');
                newTask.id = utilService.makeId()
                group.tasks.push(newTask)
            }
            return await boardService.saveGroup(group, boardId)
        } catch (err) {
            console.log('couldn\'t save task', err);
            throw err
        }
}


async function deleteTask(boardId, groupId, taskId) {
    try {
        const group = await boardService.getGroupById(groupId, boardId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        group.tasks.splice(taskIdx, 1)

        return await boardService.saveGroup(group, boardId)
    } catch (err) {
        console.log('couldn\'t delete task', err);
        throw err
    }
}


// export async function update

function getDefaultTodo(txt) {
    return {
        id: utilService.makeId(),
        title: txt,
        isDone: false
    }
}

async function saveTaskDueDateTime(boardId, groupId, taskId, formatedDate) {
    console.log(boardId, groupId, taskId, formatedDate);

    try {
        const board = await boardService.getById(boardId)
        // console.log('board:', board);
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const newTask = { ...task, dueDate: formatedDate }

        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        board.groups[groupIdx].tasks[taskIdx] = newTask
        boardService.saveGroup(board.groups[groupIdx], boardId)

        // console.log(board);
        // console.log(groupIdx, group);
        console.log('task from service', task);
        // console.log(newTask);
        return board
    } catch (err) {
        console.log('couldn\'t save task due date', err);
    }
}

async function removeDueDate(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        // const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        // const newTask = { ...task, dueDate: null }
        board.groups[groupIdx].tasks[taskIdx].dueDate = null

        await boardService.saveGroup(group, boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove task due date', err);
        throw err
    }

}

async function toggleMemberOrLabel(boardId, groupId, taskId, itemToAdd, isLabel) {
    try {
        let newTask
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        if (!isLabel) {
            const memberIdx = task.memberIds.findIndex(id => id === itemToAdd)
            if (memberIdx === -1) {
                newTask = { ...task, memberIds: [...task.memberIds, itemToAdd] }
            } else {
                const updatedMembers = [...task.memberIds]
                updatedMembers.splice(memberIdx, 1)
                newTask = { ...task, memberIds: updatedMembers }
            }
        } else {
            const LabelIdx = task.labelIds.findIndex(id => id === itemToAdd)
            if (LabelIdx === -1) {
                newTask = { ...task, labelIds: [...task.labelIds, itemToAdd] }
            } else {
                const updatedMembers = [...task.labelIds]
                updatedMembers.splice(LabelIdx, 1)
                newTask = { ...task, labelIds: updatedMembers }
            }
        }

        board.groups[groupIdx].tasks[taskIdx] = newTask
        await boardService.saveGroup(group, boardId)
        return board
    } catch (err) {
        console.log('couldn\'t add member to task', err);
        throw err
    }
}

async function deleteLabelOrMember(boardId, groupId, taskId, labelToEditId, isLabel) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        if (isLabel) {
            const updatedLabels = task.labelIds.filter(label => label !== labelToEditId)
            board.groups[groupIdx].tasks[taskIdx].labelIds = updatedLabels
        } else {
            const updatedMembers = task.memberIds.filter(member => member !== labelToEditId)
            board.groups[groupIdx].tasks[taskIdx].memberIds = updatedMembers
        }

        await boardService.saveGroup(group, boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove label from task', err);
        throw err
    }
}

// async function addMember(boardId, groupId, taskId, memberId) {
//     try {
//         let newTask
//         const board = await boardService.getById(boardId)
//         const group = board.groups.find(group => group.id === groupId)
//         const groupIdx = board.groups.findIndex(group => group.id === groupId)
//         const task = group.tasks.find(task => task.id === taskId)
//         const taskIdx = group.tasks.findIndex(task => task.id === taskId)
//         const memberIdx = task.memberIds.findIndex(id => id === memberId)

//         if (memberIdx === -1) {
//             newTask = { ...task, memberIds: [...task.memberIds, memberId] }
//         } else {
//             const updatedMembers = [...task.memberIds]
//             updatedMembers.splice(memberIdx, 1)
//             newTask = { ...task, memberIds: updatedMembers }
//         }

//         board.groups[groupIdx].tasks[taskIdx] = newTask
//         await boardService.saveGroup(group, boardId)
//         return { board, newTask }
//     } catch (err) {
//         console.log('couldn\'t add member to task', err);
//         throw err
//     }
// }



//DONT DELETE - SAHAR

// async function getTodoToChange(boardId, groupId, taskId, todoId, key){
//     const board = await boardService.getById(boardId);
//     const groupIdx = board.groups.findIndex(group => group.id === groupId);
//     const group = board.groups[groupIdx];
//     const taskIdx = group.tasks.findIndex(task => task.id === taskId);
//     const checklists = group.tasks[taskIdx].checklists;
//     let todoIdx, checklistIdx;
//     for (const [index, checklist] of checklists.entries()) {
//         todoIdx = checklist.todos.findIndex(todo => todo.id === todoId);
//         if (todoIdx !== -1) {
//             checklistIdx = index;
//             break;
//         }
//     }
//     if (typeof checklistIdx === "undefined" || typeof todoIdx === "undefined") {
//         throw new Error("Todo or Checklist not found");
//     }
//     return board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos[todoIdx];
// }

// export async function updateTodoIsDone(boardId, groupId, taskId, todoId, state) {
//     console.log('state: from task service', state)
//     try {
//         const todo = getTodoToChange(boardId, groupId, taskId, todoId )
//         await boardService.saveGroup(group, boardId);
//         return board;
//     } catch (err) {
//         console.log('cannot update todo isDone status', err);
//         throw err;
//     }
// }



function getEmptyTask() {
    return {
        title: '',
        archivedAt: null,
        labelIds: [],
        dueDate: '',
        byMember: {
            _id: '',
            username: '',
            fullname: '',
            imgUrl: '',
        },
        memberIds: [],
        comments: [],
        style: {},
        attachments: [],
        checklists: [],
        isDone: false,
        style: {},
        cover: {
            backgroundColor: '',
            img: '',
            createdAt: null
        }
    }
}

function getEmptyChecklist(title) {
    return {
        id: utilService.makeId(),
        title,
        todos: [],
    }
}


