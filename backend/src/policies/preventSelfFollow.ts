import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

export default async (ctx) => {
  const { followeeId } = ctx.request.body;
  const followerId = ctx.state.user.id;
  const actionType = ctx.state.route.handler.includes("unfollow")
    ? "unfollow"
    : "follow";

  if (followerId === followeeId) {
    throw new ApplicationError(`You cannot ${actionType} yourself!`, {
      policy: "prevent-self-follow",
      errCode: "PREVENT_SELF_FOLLOW",
    });
  }

  return true;
};
