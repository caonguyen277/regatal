const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const commentSchema = new mongoose.Schema(
    {
        user: {
            type : ObjectId,
            ref : "User",
        },
        product: {
            type : ObjectId,
            ref : "Product",
        },
        title : {
            type :String,
            maxlength : 100,
        },
        content : {
            type :String,
            maxlength : 200,
        },
        likeCount : {
            type : Number,
            default : 5,
            enum : [1,2,3,4,5]
        },
        commentTitle : {
            type : Number,
            default : 0,
            enum: [0,1]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
