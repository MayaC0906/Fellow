import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { getBoards, getBoardById, removeBoard, addBoard, updateBoard } from './board.controller.js'

export const boardRoutes = express.Router()

boardRoutes.get('/', log, getBoards)
boardRoutes.get('/:id', getBoardById)
boardRoutes.delete('/:id', removeBoard)
boardRoutes.post('/', addBoard)
boardRoutes.put('/:id', updateBoard)
