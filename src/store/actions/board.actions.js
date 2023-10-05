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
        type: UPDATE_BOARD,
        board
    }
}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        // console.log('Boards from DB:', boards)
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
        store.dispatch({type: SET_BOARD, board})
        return board
    }
    catch {
        console.log('cannot load board:', err  )
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
        console.log('Added Board', savedBoard)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export function updateBoard(board) {
    return boardService.save(board)
        .then(savedBoard => {
            console.log('Updated Board:', savedBoard)
            store.dispatch(getActionUpdateBoard(savedBoard))
            return savedBoard
        })
        .catch(err => {
            console.log('Cannot save board', err)
            throw err
        })
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

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
    store.dispatch({
        type: REMOVE_BOARD,
        boardId
    })
    showSuccessMsg('Board removed')

    boardService.remove(boardId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove board')
            console.log('Cannot load boards', err)
            store.dispatch({
                type: UNDO_REMOVE_BOARD
            })
        })
}

export async function settingIsStarred(boardId) {
    try {
        const board = await boardService.getById(boardId)
        console.log(board);
        board.isStarred = !board.isStarred
        const type = board.isStarred ? 'UNSTARRED_BOARDS' : 'STARRED_BOARDS'
        store.dispatch(type, board)
        return board
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function loadTask (boardId, groupId, taskId) {
    try {const task = await taskService.getById (boardId, groupId, taskId)
        return task
    } catch (err) {
        throw err
    }
}