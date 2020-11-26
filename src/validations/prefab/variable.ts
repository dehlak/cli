import Joi from 'joi';

export const variableSchema = Joi.object({
  kind: Joi.string()
    .valid('construct')
    .required(),
  modelId: Joi.string()
    .allow('')
    .required(),
  name: Joi.string().required(),
  ref: Joi.object({
    id: Joi.string().required(),
    endpointId: Joi.string().required(),
    customModelId: Joi.string().required(),
  }).required(),
});