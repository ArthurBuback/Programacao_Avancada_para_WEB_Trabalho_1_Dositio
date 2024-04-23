/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const products = app.mongo.db.collection('products');

    // Retorna todos os produtos existentes
    app.get('/products', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await products.find().toArray();
        }
    );

    // Cria um novo produto
    app.post('/products', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    qtd: { type: 'integer' },
                    category: { type: 'string'}
                },
                required: ['name', 'qtd', 'category']
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

    // Retorna o produto baseado no "id" dele
    app.get('/products/:id', async (request, reply) => {
        let id =  request.params.id;
        let product = await products.findOne({_id: new app.mongo.ObjectId(id)});
        
        return product;
    });
    
    // Exclui o produto selecionada pelo "id"
    app.delete('/products/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await products.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return reply.code(204).send();;
    });

    // Atualiza o produto selecionada através do "id" dele
    app.put('/products/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let product = request.body;
        
        await products.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: product.name,
                qtd: product.qtd,
                category: productz.category
            }
        });
        
        return reply.code(204).send();;
    });
}
