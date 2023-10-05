export const SET_BOARD = 'SET_BOARD'
export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const STARRED_BOARD = "STARRED_BOARD"
export const UNSTARRED_BOARD = "UNSTARRED_BOARD"


const initialState = {
    boards: [],
    lastRemovedBoard: null,
    starredBoards: []
}

export function boardReducer(state = initialState, action) {
<<<<<<< HEAD
    let newState = state
    let boards
    let starredBoards
=======
    var newState = state
    var boards
    var board
>>>>>>> 53b41d7 (board details)
    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case REMOVE_BOARD:
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        case ADD_BOARD:
            newState = { ...state, boards: [...state.boards, action.boards] }
            break
        // case UPDATE_BOARD:
        //     boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
        //     newState = { ...state, boards }
        //     break
        case UPDATE_BOARD:
            newState = { ...state, board: action.board }
            break;
        case UNDO_REMOVE_BOARD:
            if (state.lastRemovedBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
        case STARRED_BOARD:
            newState = { ...state, isStarred: action.isStarred }
            break
<<<<<<< HEAD
        case UNSTARRED_BOARD:
            starredBoards = state.starredBoards.filter(starredBoard => starredBoard._id !== action.board._id)
            newState = { ...state, starredBoards }
=======
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
>>>>>>> 53b41d7 (board details)
        default:
    }
    return newState
}
