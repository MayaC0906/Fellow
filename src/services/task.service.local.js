import { boardService } from "./board.service.local"

export const taskService = {
    getById,
    saveTaskTitle,
    saveTaskDescription,
    removeAttachment,
    addCoverImg,
    removeCover
}

async function getById(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        console.log('board to load task',board);
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

async function removeAttachment(boardId, groupId, taskId, attachmentId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const attachmentIdx = board.groups[groupIdx].tasks[taskIdx]
            .attachments.findIndex(attachment => attachment.id === attachmentId)
         
        board.groups[groupIdx].tasks[taskIdx].attachments.splice(attachmentIdx, 1)
        board.groups[groupIdx].tasks[taskIdx].cover.img =''

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

