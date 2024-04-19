/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const products = app.mongo.db.collection('products');

    app.post('/products', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    qtd: { type: 'integer' }
                },
                required: ['name', 'qtd']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let product = request.body;
        
        await products.insertOne(product);

        return reply.code(201).send();
    });

}