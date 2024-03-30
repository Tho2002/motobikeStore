const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

module.exports.role = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index", {
    titlePage: "Nhóm quyền",
    records: records,
  });
};
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/create", {
    titlePage: "Tạo nhóm quyền",
    records: records,
  });
};
module.exports.createPost = async (req, res) => {
  const records = new Role(req.body);
  await records.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  let find = {
    _id: id,
    deleted: false,
  };
  const data = await Role.findOne(find);

  res.render("admin/pages/roles/edit", {
    titlePage: "Nhóm quyền",

    data: data,
  });
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  await Role.updateOne({ _id: id }, req.body);
  req.flash("success", "cập nhật thành công");
  res.redirect("back");
};
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);

  res.render("admin/pages/roles/permissions", {
    titlePage: "Phân quyền",
    records: records,
  });
};
module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
  }
  req.flash("success", "cập nhật phân quyền  thành công");
  res.redirect("back");
};
