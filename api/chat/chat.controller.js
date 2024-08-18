import { chatService } from './chat.service.js'
import { logger } from '../../services/logger.service.js'

export async function chatReq(req, res) {
    try {
        const message = req.body.message
        logger.debug('Sending message to chatGPT API:', message)
        const response = await chatService.getChatResponse(message)
        // console.log('response.choices[0].message.content:', response.choices[0].message.content)
        res.status(200).json(response)
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({ err: 'Failed to get response form chatGPT' })
    }
}