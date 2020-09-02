/**
 * 检查用户权限
 */
async function checkOwner(ctx, next) {
  const { uid = -1, level = "" } = ctx.state.user || {};
  if (level !== "admin" && uid !== ctx.params.uid * 1) {
    ctx.throw(403, "用户无权操作");
  }
  await next();
}

module.exports = checkOwner;
