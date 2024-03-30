const dashboardRouter = require("../../routes/admin/dashboard.route");
const productsRouter = require("../../routes/admin/product.route");
const productCategorysRouter = require("../../routes/admin/product-category.route");
const roleRouter = require("../../routes/admin/role.route");
const accountRouter = require("../../routes/admin/account.route");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
  app.use(PATH_ADMIN + "/products", productsRouter);
  app.use(PATH_ADMIN + "/products-category", productCategorysRouter);
  app.use(PATH_ADMIN + "/roles", roleRouter);
  app.use(PATH_ADMIN + "/accounts", accountRouter);
};
