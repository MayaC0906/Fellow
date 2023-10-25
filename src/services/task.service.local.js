import { boardService } from "./board.service.local"
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
        console.log('couldn\'t get task', err);
        throw err
    }
}

async function saveTask(boardId, groupId, newTask) {
    console.log(boardId, groupId, newTask);
    try {
        let group = await boardService.getGroupById(groupId, boardId)
        if (newTask.id) {
            const taskIdx = group.tasks.findIndex(task => task.id === newTask.id)
            group.tasks[taskIdx] = newTask
        } else {
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
        dueDate: {
            date: null,
            isComplete: null,
            isOverdue: null
        },
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

