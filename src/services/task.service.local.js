import { boardService } from "./board.service.local"
import { utilService } from "./util.service"
export const taskService = {
    getById,
    saveTaskTitle,
    saveTaskDescription,
    removeAttachment,
    addCoverImg,
    removeCover,
    updateTodoIsDone,
    updateTodoTitle,
    deleteTodo,
    addTodo,
    getDefaultTodo,
    updateListTitle,
    saveTaskDueDateTime,
    removeDueDate,
    toggleMemberOrLabel,
    getEmptyTask,
    addChecklist,
    deleteLabel
}

async function getById(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task
    } catch (err) {
        console.log('couldn\'t get task', err);
        throw err
    }
}


// async function getTaskById(taskId, groupId, boardId) {
// 	try {
// 		const tasks = await queryTasks(groupId, boardId)
// 		const task = tasks.find((task) => task.id === taskId)
// 		return task
// 	} catch (err) {
// 		console.log('Failed to get task', err)
// 		throw err
// 	}
// }
async function updateTodoProperty(boardId, groupId, taskId, listId, todoId, key, value) {

    try {
        const board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const group = board.groups[groupIdx]
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        const checklistIdx = group.tasks[taskIdx].checklists.findIndex(list => list.id === listId)
        if (checklistIdx === -1) {
            throw new Error("checklist isn't found!")
        }    

        const todoIdx = group.tasks[taskIdx].checklists[checklistIdx].todos.findIndex(todo => todo.id === todoId)
        if (todoIdx === -1) {
            throw new Error("todo isn't found!")
        }
        if (key === 'delete'){
            board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos.splice(todoIdx, 1)
            await boardService.saveGroup(group, boardId)
            return board
        }
        if (!board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos[todoIdx].hasOwnProperty(key)) {
            throw new Error("The provided key doesn't exist on the todo")
        }

        board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos[todoIdx][key] = value

        await boardService.saveGroup(group, boardId)
        return board;
    } catch (err) {
        console.log(`cannot update todo's ${key}`, err)
        throw err
    }
}




async function deleteTodo(boardId, groupId, taskId, listId, todoId) {
    try {
        return updateTodoProperty(boardId, groupId, taskId, listId, todoId, 'delete', null);
    } catch (err) {
        console.log('cannot delete todo', err);
        throw err;
    }
}


async function updateTodoIsDone(boardId, groupId, taskId, listId, todoId, state) {
    try {
        return updateTodoProperty(boardId, groupId, taskId, listId, todoId, 'isDone', state);
    } catch (err) {
        console.log('cannot update todo isDone status', err);
        throw err;
    }
}

async function updateTodoTitle(boardId, groupId, taskId, listId, todoId, txt) {
    try {
        return updateTodoProperty(boardId, groupId, taskId, listId, todoId, 'title', txt)
    } catch (err) {
        console.log('cannot update todo title', err);
        throw err;
    }
}
async function addChecklist(boardId, groupId,taskId,title){
    try {
        const board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        // const checklists= ;
        
        // if (checklistIdx === -1) {
        //     throw new Error("checklist isn't found!");
        // }
        const checklistToAdd = getEmptyChecklist(title)
        console.log('checklistToAdd:', checklistToAdd)
        board.groups[groupIdx].tasks[taskIdx].checklists.push(checklistToAdd)
        await boardService.saveGroup(board.groups[groupIdx], boardId)
        return board;
    } catch (err) {
        console.log('cannot update list title', err);
        throw err;
    }
}

async function updateListTitle(boardId, groupId, taskId, listId, title) {
    try {
        const board = await boardService.getById(boardId);
        const groupIdx = board.groups.findIndex(group => group.id === groupId);
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId);
        const checklistIdx = board.groups[groupIdx].tasks[taskIdx].checklists.findIndex(list => list.id === listId);

        if (checklistIdx === -1) {
            throw new Error("checklist isn't found!");
        }

        board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].title = title;
        await boardService.saveGroup(board.groups[groupIdx], boardId);
        return board;
    } catch (err) {
        console.log('cannot update list title', err);
        throw err;
    }
}

async function addTodo(boardId, groupId, taskId, listId, newTodo) {

    try {
        const board = await boardService.getById(boardId);
        const groupIdx = board.groups.findIndex(group => group.id === groupId);
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId);
        const checklistIdx = board.groups[groupIdx].tasks[taskIdx].checklists.findIndex(list => list.id === listId);

        if (checklistIdx === -1) {
            throw new Error("checklist isn't found!");
        }

        
        board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos.push(newTodo);
        
        await boardService.saveGroup(board.groups[groupIdx], boardId);
        return board;
    } catch (err) {
        console.log('cannot add todo', err);
        throw err;
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

async function saveTaskTitle(boardId, groupId, taskId, newTitle) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const newTask = { ...task, title: newTitle }
        board.groups[groupIdx].tasks[taskIdx] = newTask

        boardService.saveGroup(board.groups[groupIdx], boardId)
        return board
    } catch (err) {
        console.log('couldn\'t save task title', err);
        throw err
    }
}

async function saveTaskDescription(boardId, groupId, taskId, newDescriptoin) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const newTask = { ...task, description: newDescriptoin }
        board.groups[groupIdx].tasks[taskIdx] = newTask

        boardService.saveGroup(board.groups[groupIdx], boardId)
        return board
    } catch (err) {
        console.log('couldn\'t save task description', err);
        throw err
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

async function removeAttachment(boardId, groupId, taskId, attachmentId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const attachmentIdx = board.groups[groupIdx].tasks[taskIdx]
            .attachments.findIndex(attachment => attachment.id === attachmentId)

        board.groups[groupIdx].tasks[taskIdx].attachments.splice(attachmentIdx, 1)
        board.groups[groupIdx].tasks[taskIdx].cover.img = ''

        console.log(group, 'group to send');
        boardService.saveGroup(group, boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove task attachment', err);
        throw err
    }

}

async function addCoverImg(boardId, groupId, taskId, url) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        board.groups[groupIdx].tasks[taskIdx].cover.img = url


        boardService.saveGroup(group, boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove task attachment', err);
        throw err
    }

}

async function removeCover(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        board.groups[groupIdx].tasks[taskIdx].cover.img = ''


        boardService.saveGroup(board.groups[groupIdx], boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove task attachment', err);
        throw err
    }

}

async function removeDueDate(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        const newTask = { ...task, dueDate: null }
        board.groups[groupIdx].tasks[taskIdx] = newTask

        boardService.saveGroup(group, boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove task due date', err);
        throw err
    }

}





async function toggleMemberOrLabel(boardId, groupId, taskId, itemToAdd, isLabel) {
    console.log('islabel', isLabel);
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

async function deleteLabel(boardId, groupId, taskId, labelToEditId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const updatedLabels = task.labelIds.filter(label => label.id !== labelToEditId)
        board.groups[groupIdx].tasks[taskIdx].labelIds = updatedLabels

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
        id: utilService.makeId(),
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
        style: {}
    }
}
function getEmptyChecklist(title) {
	return {
		id: utilService.makeId(),
		title,
		todos: [],
	}
}


