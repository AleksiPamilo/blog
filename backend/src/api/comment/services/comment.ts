/**
 * comment service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::comment.comment', ({ strapi }) => ({
    async create(ctx) {
        const comment = ctx.data;

        const author = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
                id: comment.author
            }
        });

        const timestamp = new Date().toISOString();
        const newComment = await strapi.entityService.create('api::comment.comment', {
            data: {
                content: comment.content,
                author: author.id,
                post: comment.post,
                createdAt: timestamp,
                publishedAt: timestamp,
            },
            populate: ['author', 'author.avatar', 'post']
        });

        return newComment;
    }
}));
