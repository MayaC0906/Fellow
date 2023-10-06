import { boardService } from "./board.service.local"

export const taskService = {
    getById,
    saveTaskTitle
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