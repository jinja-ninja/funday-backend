import { boardService } from './board.service.js'
import { logger } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'

export async function getBoards(req, res) {
    try {
        logger.debug('Getting Boards:', req.query)
        const cars = await boardService.query()
        res.json(cars)
    } catch (err) {
        logger.error('Failed to get boards', err)
        res.status(400).send({ err: 'Failed to get boards' })
    }
}

export async function getBoardById(req, res) {
    try {
        const boardId = req.params.id
        const board = await boardService.getById(boardId)
        res.json(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(400).send({ err: 'Failed to get board' })
    }
}

export async function addBoard(req, res) {
    const { loggedinUser } = req

    try {
        const board = req.body
        board.createdBy = loggedinUser
        const addedBoard = await boardService.add(board)
        socketService.broadcast({ type: 'board-added', data: addedBoard, userId: loggedinUser._id })
        res.json(addedBoard)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(400).send({ err: 'Failed to add board' })
    }
}

export async function updateBoard(req, res) {
    try {
        const board = req.body
        const updatedBoard = await boardService.update(board)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(400).send({ err: 'Failed to update board' })

    }
}

export async function removeBoard(req, res) {
    const { loggedinUser } = req
    try {
        const boardId = req.params.id
        const removedId = await boardService.remove(boardId)
        socketService.broadcast({ type: 'board-removed', data: boardId, userId: loggedinUser._id })
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove board', err)
        res.status(400).send({ err: 'Failed to remove board' })
    }
}