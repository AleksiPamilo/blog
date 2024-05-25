export default async (ctx) => {
  const { followerId, followeeId } = ctx.request.body;

  if (followerId === followeeId) {
    return false;
  }

  return true;
};