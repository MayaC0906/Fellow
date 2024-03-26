import { boardService } from "./board.service.js"
import { utilService } from "./util.service"

export const taskService = {
    getById,
    saveTask,
    getDefaultTodo,
    getEmptyTask,
    getEmptyChecklist,
    deleteTask
}

async function getById(boardId, groupId, taskId) {
    try {
        const group = await boardService.getGroupById(groupId, boardId)
        const task = group.tasks.find(task => task.id === taskId)
        return task
    } catch (err) {
        console.error('couldn\'t get task', err);
        throw err
    }
}

async function saveTask(boardId, groupId, newTask, user, txt) {
    try {
        let group = await boardService.getGroupById(groupId, boardId)
        if (newTask.id) {
            const taskIdx = group.tasks.findIndex(task => task.id === newTask.id)
            group.tasks[taskIdx] = newTask
        } else {
            newTask.id = utilService.makeId()
            group.tasks.push(newTask)
        }
        return await boardService.saveGroup(group, boardId, user, txt, newTask)
    } catch (err) {
        console.error('couldn\'t save task', err);
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
        console.error('couldn\'t delete task', err);
        throw err
    }
}

function getDefaultTodo(txt) {
    return {
        id: utilService.makeId(),
        title: txt,
        isDone: false
    }
}
function getEmptyTask() {
    return {
        title: '',
        archivedAt: null,
        labelIds: [],
        createdAt: Date.now(),
        dueDate: {
            date: null,
            isComplete: null,
            isOverdue: null,
            isDueSoon: null
        },
        byMember: userService.getLoggedinUser(),
        memberIds: [],
        comments: [],
        style: {},
        attachments: [],
        checklists: [],
        isDone: false,
        style: {},
        cover: {
            isDark: false,
            isFull: false,
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

