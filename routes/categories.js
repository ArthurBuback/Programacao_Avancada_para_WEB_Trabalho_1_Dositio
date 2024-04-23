/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function categories(app, options) {
    const InvalidCategoryError = createError('InvalidCategoryError', 'Categoria Inválida.', 400);

    const categories = app.mongo.db.collection('categories');

    // Retorna todas as categorias existentes
    app.get('/categories', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await categories.find().toArray();
        }
    );

    // Cria uma nova categoria
    app.post('/categories', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    img_url: { type: 'string' }
                },
                required: ['name', 'img_url']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let category = request.body;
        
        await categories.insertOne(category);

        return reply.code(201).send();
    });

    // Retorna a categoria baseado no "id" dela
    app.get('/categories/:id', async (request, reply) => {
        let id =  request.params.id;
        let category = await categories.findOne({_id: new app.mongo.ObjectId(id)});
        
        return category;
    });

    // Exclui a categoria selecionada pelo "id"
    app.delete('/categories/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await categories.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return reply.code(204).send();;
    });

    // Atualiza a categoria selecionada através do "id" dela
    app.put('/categories/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let category = request.body;
        
        await categories.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: category.name,
                img_url: category.img_url
            }
        });
        
        return reply.code(204).send();;
    });

}
