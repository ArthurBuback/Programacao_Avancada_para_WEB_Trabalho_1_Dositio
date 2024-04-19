/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function registers(app, options) {
    const InvalidRegisterError = createError('InvalidRegisterError', 'Registro Inválido.', 400);

    const registers = app.mongo.db.collection('registers');

    app.post('/registers', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                },
                required: ['name']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let register = request.body;
        
        await registers.insertOne(register);

        return reply.code(201).send();
    });

}