const homeRouter = require("../../routes/client/home.route");
const productsRouter = require("../../routes/client/product.route");
module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/products", productsRouter);
};
