import { OpenAI } from 'openai';
import { PROMPT } from './prompts';

import { RestaurantPayload } from './interface';

const aiInstance = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});


export const convertMessageToFoursquarePayload = async (input: string): Promise<RestaurantPayload> => {
    let responseText: string = '{}';
    try {
        const chat = await aiInstance.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: PROMPT },
                { role: 'user', content: input },
            ],
            temperature: 0,
        });

        responseText = chat.choices[0].message.content?.trim() ?? '{}';
        const payload: RestaurantPayload = JSON.parse(responseText);
        return payload;
    } catch (err) {
        console.error('Failed to parse payload:', responseText);
        throw err;
    }
}
