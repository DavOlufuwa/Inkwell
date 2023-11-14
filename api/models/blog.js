const mongoose  = require("mongoose");
const { Schema, model } = mongoose;
const mongoosePaginate = require("mongoose-paginate");

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
    type: Schema.Types.ObjectId,
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
  readingtime: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  }, 
  content: {
    type: String,
    required: true,
  },
  timeStamp: {
    createdAt : {
      type: Date,
      default: Date.now
    }, 
    publishedAt : {
      type: Date,
      default: Date.now
    }
  }
})

blogSchema.plugin(mongoosePaginate)

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

const Blog = model("Blog", blogSchema);

module.exports = Blog