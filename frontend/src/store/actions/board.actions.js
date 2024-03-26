import { store } from '../store.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, UNDO_UPDATE_BOARD } from "../reducers/board.reducer.js";

import { boardService } from "../../services/board.service.js";
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

export async function loadBoards(user) {
    try {
        const boards = await boardService.query();
        let filteredBoards = boards
        if (user) {
            if (user.username !== 'Guest') {
                filteredBoards = boards.filter(board =>
                    board.members.some(boardMember => boardMember._id === user._id)
                )
            }
        } else {
            console.error('No user provided, no boards will be filtered.');
        }

        store.dispatch({
            type: SET_BOARDS,
            boards: filteredBoards
        })
        return filteredBoards
    } catch (err) {
        console.error('Cannot load boards', err)
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
        console.error('cannot load board:', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getActionRemoveBoard(boardId))
    } catch (err) {
        console.error('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board, user, txt) {

    try {
        const savedBoard = await boardService.save(board, user, txt)
        store.dispatch(getActionUpdateBoard(savedBoard))

        return savedBoard
    } catch (err) {
        console.error('Cannot add board', err)

        throw err
    }
}

export async function updateBoard(boardToSave, user, txt) {
    store.dispatch(getActionUpdateBoard(boardToSave))
    try {

        await boardService.save(boardToSave, user, txt)
    } catch (err) {
        console.error('Cannot update board', err)
        store.dispatch({
            type: UNDO_UPDATE_BOARD
        })
        throw err
    }
}

export async function updateBoards(boards, newBoard, user, txt) {
    try {
        await boardService.save(newBoard, user, txt)
        const boardIdx = boards.findIndex(board => newBoard._id === board._id)
        boards[boardIdx] = newBoard
        store.dispatch({
            type: SET_BOARDS,
            boards: [...boards]
        })
        return boards
    } catch (err) {
        console.error('Cannot update boards', err)
        throw err
    }
}

export async function removeGroup(group, boardId, user, txt) {
    try {
        const savedBoard = await boardService.removeGroup(group, boardId, user, txt)
        store.dispatch(getActionUpdateBoard(savedBoard))
        return group
    } catch (err) {
        console.error('Cannot remove group', err)
        throw err
    }
}


export async function saveNewTask(boardId, groupId, newTask, user, txt, newBoard) {
    store.dispatch(getActionUpdateBoard(newBoard))
    try {
        const board = await boardService.save(newBoard, user, txt)
        return board
    } catch (err) {
        console.error('Cannot save new task', err)
        store.dispatch({
            type: UNDO_UPDATE_BOARD
        })
        throw err
    }
}

export async function deleteTask(boardId, groupId, taskId) {
    try {
        const board = await taskService.deleteTask(boardId, groupId, taskId)
        store.dispatch(getActionUpdateBoard(board))
        return board
    } catch (err) {
        console.error('cannot delete task', error);
        throw err
    }
}

export async function saveGroup(group, boardId, user, txt) {
    try {
        const board = await boardService.saveGroup(group, boardId, user, txt)
        store.dispatch(getActionUpdateBoard(board))
        return group
    } catch (err) {
        console.error('Cannot save group', err)
        throw err
    }
}

export async function loadTask(boardId, groupId, taskId) {
    try {
        const task = await taskService.getById(boardId, groupId, taskId)
        return task
    } catch (err) {
        console.error('Cannot load task', err)
        throw err
    }
}




