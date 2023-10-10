import { boardService } from "./board.service.local"
import { utilService } from "./util.service"
export const taskService = {
    getById,
    saveTaskTitle,
    saveTaskDescription,
    updateTodoIsDone,
    updateTodoTitle,
    deleteTodo,
    addTodo,
    getDefaultTodo,
    updateListTitle,
    saveTaskDueDateTime,
    removeDueDate,
    addMember
}

async function getById(boardId, groupId, taskId) {
    console.log(boardId, groupId, taskId);
    try {
        console.log('BEFORE GET ID');
        const board = await boardService.getById(boardId)
        console.log('board from get is task', board);
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task
    } catch (err) {
        console.log('couldn\'t get task', err);
        throw err
    }
}

async function updateTodoProperty(boardId, groupId, taskId, todoId, key, value) {
    try {
        const board = await boardService.getById(boardId);
        const groupIdx = board.groups.findIndex(group => group.id === groupId);
        const group = board.groups[groupIdx];
        const taskIdx = group.tasks.findIndex(task => task.id === taskId);
        const checklists = group.tasks[taskIdx].checklists;
        let todoIdx, checklistIdx;

        for (const [index, checklist] of checklists.entries()) {
            todoIdx = checklist.todos.findIndex(todo => todo.id === todoId);
            if (todoIdx !== -1) {
                checklistIdx = index;
                break;
            }
        }

        if (key === 'delete') {
            board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos.splice(todoIdx, 1)
            await boardService.saveGroup(group, boardId);
            return board;
        }
        if (typeof checklistIdx === "undefined" || typeof todoIdx === "undefined") {
            throw new Error("checklist isnt found!");
        }

        if (!board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos[todoIdx].hasOwnProperty(key)) {
            throw new Error("The provided key doesn't exist on the todo");
        }

        board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos[todoIdx][key] = value;

        await boardService.saveGroup(group, boardId);
        return board;
    } catch (err) {
        console.log(`cannot update todo's ${key}`, err);
        throw err;
    }
}



async function deleteTodo(boardId, groupId, taskId, todoId) {
    try {
        return updateTodoProperty(boardId, groupId, taskId, todoId, 'delete')
    } catch (err) {
        console.log('cannot delete todo', err)
        throw err
    }
}

async function updateTodoIsDone(boardId, groupId, taskId, todoId, state) {
    try {
        return updateTodoProperty(boardId, groupId, taskId, todoId, 'isDone', state);
    } catch (err) {
        console.log('cannot update todo isDone status', err);
        throw err;
    }
}

async function updateTodoTitle(boardId, groupId, taskId, todoId, txt) {
    try {
        return updateTodoProperty(boardId, groupId, taskId, todoId, 'title', txt)
    } catch (err) {
        console.log('cannot update todo title', err);
        throw err;
    }
}
async function updateListTitle(boardId, groupId, taskId, listId, title) {
    try {
        const board = await boardService.getById(boardId);
        const group = board.groups.find(group => group.id === groupId);
        const groupIdx = board.groups.findIndex(group => group.id === groupId);
        const task = group.tasks.find(task => task.id === taskId);
        const taskIdx = group.tasks.findIndex(task => task.id === taskId);
        const list = task.checklists.find(list => list.id === listId);
        const listIdx = task.checklists.findIndex(list => list.id === listId);
        const newListTitle = { ...list, title };
        board.groups[groupIdx].tasks[taskIdx].checklists[listIdx] = newListTitle;
        await boardService.saveGroup(group, boardId);
        return board
    } catch (err) {
        console.log('cannot update list title', err);
        throw err;
    }
}



async function addTodo(boardId, groupId, taskId, listId, txt) {
    try {
        const board = await boardService.getById(boardId);
        const group = board.groups.find(group => group.id === groupId);
        const task = group.tasks.find(task => task.id === taskId);
        const list = task.checklists.find(list => list.id === listId);
        console.log('list: before change', list)
        const newTodo = getDefaultTodo(txt);
        list.todos.push(newTodo);
        console.log('list: after list', list)
        await boardService.saveGroup(group, boardId);
        return board;
    } catch (err) {
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

async function addMember(boardId, groupId, taskId, memberId) {
    // console.log('task service', memberId);
    try {
        let newTask
        console.log('GET FROM ADD MEMBER IN TASK SERVICE=>');
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        const memberIdx = task.memberIds.findIndex(id => id === memberId)

        // console.log('task.memberIds before', task.memberIds);
        // console.log('Idx:', memberIdx);
        if (memberIdx === -1) {
            // console.log('if');
            newTask = { ...task, memberIds: [...task.memberIds, memberId] }
        } else {
            // console.log('else');
            const updatedMembers = [...task.memberIds]
            updatedMembers.splice(memberIdx, 1)
            // console.log('updated Members in if:', updatedMembers);
            newTask = { ...task, memberIds: updatedMembers }
        }

        // newTask =         
        // console.log('task.memberIds after', newTask.memberIds);

        // console.log('task after:', newTask);
        board.groups[groupIdx].tasks[taskIdx] = newTask

        boardService.saveGroup(group, boardId)
        return { board, newTask }
    } catch (err) {
        console.log('couldn\'t add member to task', err);
        throw err
    }
}



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