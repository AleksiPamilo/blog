import { sanitize } from "@strapi/utils";

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
        return ctx.throw(404, "User not found!");
      }

      if (follower.followings.some((user) => user.id === followeeId)) {
        return ctx.throw(403, "Already following this user!");
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
        return ctx.throw(404, "User not found!");
      }

      if (!follower.followings.some((user) => user.id === followeeId)) {
        return ctx.throw(403, "Not following this user!");
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
        return ctx.throw(404, "User not found!");
      }

      const isFollowing = follower.followings.some(
        (user) => user.id === parseInt(followeeId)
      );

      ctx.send({ isFollowing });
    } catch (err) {
      ctx.throw(500, err);
    }
  };

  plugin.controllers.user.changeUsername = async (ctx) => {
    const { id } = ctx.state.user;
    const { newUsername, slug } = ctx.request.body;

    if (!ctx.state.user) {
      return ctx.throw(401, 'You must be logged in to change your username.');
    }

    if (!newUsername || !slug) {
      return ctx.throw(403, "New username is required!");
    }

    try {
      const usernameExists = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { username: newUsername } });

      if (usernameExists) {
        return ctx.throw(403, { message: "Username already taken!" });
      }

      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { id } });

      const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
      const lastChange = new Date(user.lastUsernameChange) ? new Date(user.lastUsernameChange) : null;

      if (lastChange && (Date.now() - lastChange.getTime() < oneMonthInMs)) {
        const nextChangeDate = new Date(lastChange.getTime() + oneMonthInMs).toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return ctx.throw(400, {
          message: "You can only change your username once every month. You can change your username again on " + nextChangeDate,
        });
      }

      await strapi.entityService.update("plugin::users-permissions.user", id, {
        data: {
          username: newUsername,
          slug: slug,
          lastUsernameChange: Date.now()
        }
      })

      return ctx.send({ message: "Username updated successfully!" })
    } catch (err) {
      console.log(err)
      return ctx.throw(500, { message: "Internal server error", details: err.message });
    }
  }

  plugin.routes["content-api"].routes.push(
    {
      method: "POST",
      path: "/follow",
      handler: "user.followUser",
      config: { policies: ["global::preventSelfFollow"], },
    },
    {
      method: "POST",
      path: "/unfollow",
      handler: "user.unfollowUser",
      config: { policies: ["global::preventSelfFollow"], },
    },
    {
      method: "GET",
      path: "/follow-status/:followeeId",
      handler: "user.checkFollowStatus",
      config: { policies: [], },
    },
    {
      method: "POST",
      path: "/changeUsername",
      handler: "user.changeUsername",
      config: { policies: [], },
    }
  );

  return plugin;
};
