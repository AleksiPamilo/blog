export default async (ctx) => {
  const { followeeId } = ctx.request.body;
  const followerId = ctx.state.user.id;

  if (followerId === followeeId) {
    return false;
  }

  return true;
};
