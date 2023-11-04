import { OpenAI } from "openai"
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function getChatResponse(message) {
    return await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0,
        max_tokens: 1000,
    })
}

export const chatService = {
    getChatResponse
}