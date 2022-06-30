const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const favouriteSchema = new mongoose.Schema(
    {
        user : {
            type : ObjectId,
            ref : "User",
        },
        products : [
            {
                type:ObjectId,
                ref : "Product"
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Favourite", favouriteSchema);
