import { boardService } from "../../services/board.service.local.js";
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD } from "../reducers/board.reducer.js";
import { taskService } from "../../services/task.service.local.js";

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}

export function getActionUpdateBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({
            type: SET_BOARDS,
            boards
        })
        return boards
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch({ type: SET_BOARD, board })
        return board
    }
    catch {
        console.log('cannot load board:', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getActionRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Updated Board:', savedBoard)
        store.dispatch(getActionUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}


export async function removeGroup(groupId, boardId) {
    try {
        const savedBoard = await boardService.removeGroup(groupId, boardId)
        store.dispatch(getActionUpdateBoard(savedBoard))
        return groupId
    } catch (err) {
        console.log('Cannot remove group', err)
        throw err
    }
}


export async function saveNewTask(boardId, groupId, newTask) {
    try {
        const board = await taskService.saveTask(boardId, groupId, newTask)
        store.dispatch(getActionUpdateBoard(board))
        return board
    } catch (err) {
        console.log('cannot save new task');
        throw err
    }
}

export async function saveGroup(group, boardId) {
    try {
        const board = await boardService.saveGroup(group, boardId)
        store.dispatch(getActionUpdateBoard(board))
        return group
    } catch (err) {
        console.log('Cannot save group', err)
        throw err
    }
}

// // Demo for Optimistic Mutation 
// // (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveBoardOptimistic(boardId) {
//     store.dispatch({
//         type: REMOVE_BOARD,
//         boardId
//     })
//     showSuccessMsg('Board removed')

//     boardService.remove(boardId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove board')
//             console.log('Cannot load boards', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_BOARD
//             })
//         })
// }



export async function loadTask(boardId, groupId, taskId) {
    try {
        const task = await taskService.getById(boardId, groupId, taskId)
        return task
    } catch (err) {
        throw err
    }
}


export async function saveTaskDueDate(boardId, groupId, taskId, formatedDate) {
    try {
        const board = await taskService.saveTaskDueDateTime(boardId, groupId, taskId, formatedDate)
        store.dispatch(getActionUpdateBoard(board))
        console.log('after:', board)
    } catch (err) {
        console.log('can not save due date:', err)
        throw err
    }
}


export async function removeDueDate(boardId, groupId, taskId) {
    try {
        const board = await taskService.removeDueDate(boardId, groupId, taskId)
        store.dispatch(getActionUpdateBoard(board))
    } catch (err) {
        throw err
    }
}

export async function toggleMemberOrLabel(boardId, groupId, taskId, itemToAdd, isLabel) {

    try {
        const board = await taskService.toggleMemberOrLabel(boardId, groupId, taskId, itemToAdd, isLabel)
        // store.dispatch(getActionUpdateBoard(board))
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        throw err
    }
}

export async function saveLabelOnBoard(boardId, savedLabel) {
    try {
        const board = await boardService.saveLabel(boardId, savedLabel)
        store.dispatch(getActionUpdateBoard(board))
    } catch (err) {
        console.log('Cannot save label', err)
        throw err
    }
}

export async function removeLabelFromBoard(boardId, labelId) {
    try {
        const board = await boardService.deleteLabel(boardId, labelId)
        store.dispatch(getActionUpdateBoard(board))
        return board
    } catch (err) {
        console.log('Cannot delete label', err)
        throw err
    }
}

export async function removeLabelOrMemberFromTask(boardId, groupId, taskId, labelToEditId, isLabel) {
    try {
        const board = await taskService.deleteLabelOrMember(boardId, groupId, taskId, labelToEditId, isLabel)
        store.dispatch(getActionUpdateBoard(board))
    } catch (err) {
        console.log('Cannot delete label', err)
        throw err
    }
}

