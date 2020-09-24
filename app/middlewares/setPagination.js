/**
 * 对 queryString 中的页码和分页数量进行计算，以适用于数据库查询
 */
async function setPagination(ctx, next) {
  let { page = 1, per_page = 12 } = ctx.query;
  page = Math.max(page * 1, 1) - 1;
  const limit = Math.max(per_page * 1, 1);
  const offset = page * per_page;
  ctx.pagination = { limit, offset };

  await next();
}

module.exports = setPagination;
