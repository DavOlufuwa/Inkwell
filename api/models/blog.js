const mongoose  = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.String,
    ref: "User",
    required: true,
  }, 
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  readCount: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  }, 
  body: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  }
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

Blog = model("Blog", blogSchema);

module.exports = Blog