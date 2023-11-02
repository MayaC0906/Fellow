import { logger } from '../../services/logger.service.js'
import { boardService } from './board.service.js'
import { socketService } from '../../services/socket.service.js'


export async function getBoards(req, res) {
    try {
        const boards = await boardService.query()
        res.json(boards)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

export async function getBoardById(req, res) {
    try {
        const boardId = req.params.id
        const board = await boardService.getById(boardId)
        
        res.json(board)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get board' })
    }
}

export async function addBoard(req, res) {
    const { loggedinUser } = req
    try {
        const board = req.body
        board.createdBy = loggedinUser
        const addedBoard = await boardService.add(board)
        // socketService.broadcast({ type: 'toy-added', data: addedToy, userId: loggedinUser._id })
        res.json(addedBoard)
    } catch (err) {
        // logger.error('Failed to add car', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

export async function updateBoard(req, res) {
    console.log('entered update:')
    try {
        const board = req.body
        const updatedBoard = await boardService.update(board)
        res.json(updatedBoard)
    } catch (err) {
        // logger.error('Failed to update car', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

export async function removeBoard(req, res) {
    // const { loggedinUser } = req

    try {
        const boardId = req.params.id
        await boardService.remove(boardId)
        // socketService.broadcast({ type: 'toy-removed', data: toyId, userId: loggedinUser._id })

        res.send()
    } catch (err) {
        // logger.error('Failed to remove car', err)
        res.status(500).send({ err: 'Failed to remove board' })
    }
}
