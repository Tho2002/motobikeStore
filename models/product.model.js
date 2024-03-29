const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const bikelistSchema = new mongoose.Schema(
  {
    title: String,
    product_category_id: { type: String, default: "" },
    description: String,
    price: Number,

    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true },
    category: String,
    thumbnail: String,
    status: String,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const ListBike = mongoose.model("ListBike", bikelistSchema, "bikelist");
module.exports = ListBike;
