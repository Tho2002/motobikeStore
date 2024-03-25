const dashboardRouter = require("../../routes/admin/dashboard.route");
const productsRouter = require("../../routes/admin/product.route");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
  app.use(PATH_ADMIN + "/products", productsRouter);
};
