import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query() {
    try {
        const collection = await dbService.getCollection('board')
        const boards = collection.find().toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ _id: ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = {
            title: board.title,
            isStarred: board.isStarred,
            archivedAt: board.archivedAt,
            createdBy: board.createdBy,
            style: board.style,
            labels: board.labels,
            members: board.members,
            groups: board.groups,
            activities: board.activities,
            priorities: board.priorities,
            cmpsOrder: board.cmpsOrder,
        }
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(board._id) }, { $set: boardToSave })
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

async function addCarMsg(carId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('car')
        await collection.updateOne({ _id: ObjectId(carId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add car msg ${carId}`, err)
        throw err
    }
}

async function removeCarMsg(carId, msgId) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.updateOne({ _id: ObjectId(carId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add car msg ${carId}`, err)
        throw err
    }
}

export const boardService = {
    remove,
    query,
    getById,
    add,
    update,
    addCarMsg,
    removeCarMsg
}
