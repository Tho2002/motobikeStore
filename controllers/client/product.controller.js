const ListBike = require("../../models/product.model");
module.exports.product = async (req, res) => {
  const listbikes = await ListBike.find({ deleted: false }).sort({
    position: "desc",
  });
  const newlistbike = listbikes.map((item) => {
    item.pricenew = (
      ((100 - item.discountPercentage) * item.price) /
      100
    ).toFixed(0);
    return item;
  });

  res.render("client/pages/product/index", {
    titlePage: "Danh sách sản phẩm",
    listbike: newlistbike,
  });
};
///detail
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active",
    };
    const listbike = await ListBike.findOne(find);

    res.render("client/pages/product/detail", {
      titlePage: listbike.title,
      listbike: listbike,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
