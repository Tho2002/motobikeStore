const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    parent_id: { type: String, default: "" },

    slug: { type: String, slug: "title", unique: true },
    thumbnail: String,
    position: Number,
    status: String,

    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const ProductCategory = mongoose.model(
  "ProductCategory ",
  productCategorySchema,
  "productcategory"
);
module.exports = ProductCategory;
