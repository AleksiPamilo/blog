/**
 * profile-comment service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::profile-comment.profile-comment', ({ strapi }) => ({
    async create(ctx) {
        const comment = ctx.data;

        const author = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
                id: comment.author
            }
        });

        const timestamp = new Date().toISOString();
        const newComment = await strapi.entityService.create('api::profile-comment.profile-comment', {
            data: {
                content: comment.content,
                author: author.id,
                commentedOn: comment.commentedOn,
                createdAt: timestamp,
                publishedAt: timestamp,
            },
            populate: ['author', 'author.avatar', 'commentedOn']
        });

        return newComment;
    }
}));
