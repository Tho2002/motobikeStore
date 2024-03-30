const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generate.generateRandomString(20),
    },
    phone: Number,
    avatar: String,
    role_id: String,
    status: String,
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Account = mongoose.model("Account ", accountSchema, "accounts");
module.exports = Account;