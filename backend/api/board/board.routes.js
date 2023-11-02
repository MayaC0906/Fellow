import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getBoards, getBoardById, removeBoard, addBoard,updateBoard } from './board.controller.js'

export const boardRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

boardRoutes.get('/', log, getBoards)
boardRoutes.get('/:id', getBoardById)
boardRoutes.delete('/:id', removeBoard)
boardRoutes.post('/', addBoard)
boardRoutes.put('/:id', updateBoard)

// router.delete('/:id', requireAuth, requireAdmin, removeCar)
// toyRoutes.post('/:id/msg', requireAuth, addToyMsg)

// toyRoutes.delete('/:id/msg/:msgId', requireAuth, removeToyMsg)