const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const Role = require("../../models/role.model");
const md5 = require("md5");
module.exports.accounts = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne(
      { _id: record.role_id },
      { deleted: false }
    );
    record.role = role;
  }
  res.render("admin/pages/accounts/index", {
    titlePage: "Danh sách tài khoản",
    records: records,
  });
};
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const roles = await Role.find(find);
  res.render("admin/pages/accounts/create", {
    titlePage: "Tạo mới tài khoản",

    roles: roles,
  });
};
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (emailExist) {
    req.flash("error", `Đã có ${req.body.email}Vui lòng nhập lại email`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);

    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

//Sửa tài khoản [GET]
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const roles = await Role.find({ deleted: false });

    const data = await Account.findOne({
      deleted: false,
      _id: id,
    });

    res.render("admin/pages/accounts/edit", {
      titlePage: " Chỉnh sửa Tài khoản ",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts/edit`);
  }
};
//Chỉnh sửa tài khoản [PATCH]
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  await Account.updateOne({ _id: id }, req.body);
  req.flash("success", "cập nhật thành công");
  res.redirect("back");
};
