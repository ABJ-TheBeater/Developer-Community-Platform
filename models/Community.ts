import mongoose, { Schema, models, model } from "mongoose";

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default models.Community || model("Community", CommunitySchema);