import Joi from 'joi';

export const addMeetingValidator = Joi.object({
    development_team_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Development team ID must be a number',
            'number.integer': 'Development team ID must be an integer',
            'number.positive': 'Development team ID must be positive',
            'any.required': 'Development team ID is required'
        }),

    start_datetime: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Start datetime must be a valid date',
            'date.format': 'Start datetime must be in ISO format',
            'any.required': 'Start datetime is required'
        }),

    end_datetime: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'End datetime must be a valid date',
            'date.format': 'End datetime must be in ISO format',
            'any.required': 'End datetime is required'
        }),

    description: Joi.string()
        .min(3)
        .max(1000)
        .required()
        .messages({
            'string.base': 'Description must be a string',
            'string.min': 'Description must be at least 3 characters long',
            'string.max': 'Description must not exceed 1000 characters',
            'any.required': 'Description is required'
        }),

    room: Joi.string()
        .min(2)
        .max(255)
        .required()
        .messages({
            'string.base': 'Room must be a string',
            'string.min': 'Room must be at least 2 characters long',
            'string.max': 'Room must not exceed 255 characters',
            'any.required': 'Room is required'
        })
});
