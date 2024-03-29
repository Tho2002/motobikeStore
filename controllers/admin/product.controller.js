const ListBike = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
//[GET]
module.exports.product = async (req, res) => {
  //bộ lọc
  const filterStatus = filterStatusHelper(req.query);

  let find = { deleted: false };
  if (req.query.status) {
    find.status = req.query.status;
  }
  //searchfrom
  const objSearch = searchHelper(req.query);
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }

  //pagination
  const countListBike = await ListBike.countDocuments(find);
  let objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countListBike
  );
  //end pagination

  //sort
  let sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  ///
  const listbike = await ListBike.find(find)
    .sort(sort)
    .limit(objPagination.limitItem)
    .skip(objPagination.currentPage);

  res.render("admin/pages/product/index", {
    titlePage: "Trang admin product",
    listbike: listbike,
    filterStatus: filterStatus,
    keyword: objSearch.keyword,
    pagination: objPagination,
  });
};
//changeStatus
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await ListBike.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công");
  res.redirect("back");
};
//changeMulti
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  switch (type) {
    case "active":
      await ListBike.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Cập nhật trạng thái ${ids.length} sản phẩm thành công`
      );
      break;
    case "inactive":
      await ListBike.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng thái ${ids.length} sản phẩm thành công`
      );
      break;
    case "delete-all":
      await ListBike.updateMany(
        { _id: { $in: ids } },
        { deleted: "true", deletedAt: new Date() }
      );
      req.flash("success", `Đã xóa ${ids.length} sản phẩm thành công`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);

        await ListBike.updateOne({ _id: id }, { position: position });
        req.flash("success", `Đã đổi vị trí ${ids.length} sản phẩm thành công`);
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await ListBike.deleteOne({ _id: id }); //xóa cứng
  await ListBike.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  ); //xóa mềm
  res.redirect("back");
};
module.exports.create = async (req, res) => {
  let find = { deleted: false };
  const category = await ProductCategory.find(find);
  const newcategory = createTreeHelper.tree(category);
  res.render("admin/pages/product/create", {
    titlePage: "Thêm mới sản phẩm",
    category: newcategory,
  });
};
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countListBike = await ListBike.countDocuments();
    req.body.position = countListBike + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const listbike = new ListBike(req.body);
  await listbike.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const listbike = await ListBike.findOne(find);
    const category = await ProductCategory.find({ deleted: false });
    const newcategory = createTreeHelper.tree(category);
    res.render("admin/pages/product/edit", {
      titlePage: "Chỉnh sửa sản phẩm",
      listbike: listbike,
      category: newcategory,
    });
  } catch (error) {
    req.flash("error", `Lỗi không thể chỉnh sửa sản phẩm`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await ListBike.updateOne(
      {
        _id: id,
      },
      req.body
    );
    req.flash("success", `Cập nhật   sản phẩm thành công`);
  } catch (error) {
    req.flash("error", `Cập nhật   sản phẩm thất bại`);
  }
  res.redirect("back");
};
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const listbike = await ListBike.findOne(find);

    res.render("admin/pages/product/detail", {
      titlePage: listbike.title,
      listbike: listbike,
    });
  } catch (error) {
    req.flash("error", `Lỗi không thể chỉnh sửa sản phẩm`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
