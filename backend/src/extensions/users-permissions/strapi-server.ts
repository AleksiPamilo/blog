export default (plugin) => {
  plugin.controllers.user.followUser = async (ctx) => {
    const { followeeId } = ctx.request.body;
    const followerId = ctx.state.user.id;

    if (!followerId || !followeeId) {
      return ctx.throw(400, "Bad Request");
    }

    try {
      const follower = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: followerId },
          populate: ["followings"],
        });

      const followee = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: followeeId },
          populate: ["followers"],
        });

      if (!follower || !followee) {
        return ctx.throw(404, "User not found");
      }

      if (follower.followings.some((user) => user.id === followeeId)) {
        return ctx.throw(400, "Already following this user");
      }

      const updatedFollowings = follower.followings
        ? [
            ...new Set([
              ...follower.followings.map((user) => user.id),
              followeeId,
            ]),
          ]
        : [followeeId];

      await strapi.query("plugin::users-permissions.user").update({
        where: { id: followerId },
        data: {
          followings: updatedFollowings,
        },
      });

      const updatedFollowers = followee.followers
        ? [
            ...new Set([
              ...followee.followers.map((user) => user.id),
              followerId,
            ]),
          ]
        : [followerId];

      await strapi.query("plugin::users-permissions.user").update({
        where: { id: followeeId },
        data: {
          followers: updatedFollowers,
        },
      });

      ctx.send({ message: "User followed successfully" });
    } catch (err) {
      ctx.throw(500, err);
    }
  };

  plugin.controllers.user.unfollowUser = async (ctx) => {
    const { followeeId } = ctx.request.body;
    const followerId = ctx.state.user.id;

    if (!followerId || !followeeId) {
      return ctx.throw(400, "Bad Request");
    }

    try {
      const follower = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: followerId },
          populate: ["followings"],
        });

      const followee = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: followeeId },
          populate: ["followers"],
        });

      if (!follower || !followee) {
        return ctx.throw(404, "User not found");
      }

      if (!follower.followings.some((user) => user.id === followeeId)) {
        return ctx.throw(400, "Not following this user");
      }

      const updatedFollowings = follower.followings
        ? follower.followings.filter((user) => user.id !== followeeId)
        : [];

      await strapi.query("plugin::users-permissions.user").update({
        where: { id: followerId },
        data: {
          followings: updatedFollowings,
        },
      });

      const updatedFollowers = followee.followers
        ? followee.followers.filter((user) => user.id !== followerId)
        : [];

      await strapi.query("plugin::users-permissions.user").update({
        where: { id: followeeId },
        data: {
          followers: updatedFollowers,
        },
      });

      ctx.send({ message: "User unfollowed successfully" });
    } catch (err) {
      ctx.throw(500, err);
    }
  };

  plugin.controllers.user.checkFollowStatus = async (ctx) => {
    const { followeeId } = ctx.params;
    const followerId = ctx.state.user.id;

    if (!followerId || !followeeId) {
      return ctx.throw(400, "Bad Request");
    }

    try {
      const follower = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: followerId },
          populate: ["followings"],
        });

      if (!follower) {
        return ctx.throw(404, "User not found");
      }

      const isFollowing = follower.followings.some(
        (user) => user.id === parseInt(followeeId)
      );

      ctx.send({ isFollowing });
    } catch (err) {
      ctx.throw(500, err);
    }
  };

  plugin.routes["content-api"].routes.push(
    {
      method: "POST",
      path: "/followUser",
      handler: "user.followUser",
      config: {
        policies: ["global::preventSelfFollow"],
      },
    },
    {
      method: "POST",
      path: "/unfollowUser",
      handler: "user.unfollowUser",
      config: {
        policies: ["global::preventSelfFollow"],
      },
    },
    {
      method: "GET",
      path: "/follow-status/:followeeId",
      handler: "user.checkFollowStatus",
      config: {
        policies: [],
      },
    }
  );

  return plugin;
};
