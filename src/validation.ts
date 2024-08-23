// validation.ts
import Joi from 'joi';

export const malmoboSchema = Joi.object({
    name: Joi.string().min(1).max(100).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 1 character long',
        'string.max': 'Name must be at most 100 characters long',
        'any.required': 'Name is required'
    }),
    nickname: Joi.string().min(1).max(100).required().messages({
        'string.base': 'Nickname must be a string',
        'string.empty': 'Nickname is required',
        'string.min': 'Nickname must be at least 1 character long',
        'string.max': 'Nickname must be at most 100 characters long',
        'any.required': 'Nickname is required'
    })
});


// Post Validation Schema - kan lägga till messages om vi villq
export const postSchema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    malmobo_id: Joi.number().integer().positive().required(),
    created_at: Joi.date().iso().default(() => new Date())
});
