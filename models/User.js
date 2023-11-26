const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      //   minLength: [6, "password should greater than 6 charachter"],
      select: true,
    },
    location: { type: String },
    profileUrl: { type: String },
    profession: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
    views: [{ type: String }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema, "user");

module.exports = UserModel;
