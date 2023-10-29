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

export async function addBoard(board, user, txt) {
    try {
        const savedBoard = await boardService.save(board, user, txt)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board, user, txt) {
    console.log('txt:', txt)
    try {
        const savedBoard = await boardService.save(board, user, txt)
        store.dispatch(getActionUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}


export async function removeGroup(group, boardId, user, txt) {
    try {
        const savedBoard = await boardService.removeGroup(group, boardId, user, txt)
        store.dispatch(getActionUpdateBoard(savedBoard))
        return group
    } catch (err) {
        console.log('Cannot remove group', err)
        throw err
    }
}


export async function saveNewTask(boardId, groupId, newTask, user, txt) {
    try {
        const board = await taskService.saveTask(boardId, groupId, newTask, user, txt)
        store.dispatch(getActionUpdateBoard(board))
        return board
    } catch (err) {
        console.log('cannot save new task');
        throw err
    }
}

export async function saveGroup(group, boardId, user, txt) {
    console.log('user:', user)
    try {
        const board = await boardService.saveGroup(group, boardId, user, txt)
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




