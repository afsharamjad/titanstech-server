const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
    description: { type: String, required: true },
    image: { type: String },
    likes: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: "CommentModel" }],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema, "post");

module.exports = PostModel;
