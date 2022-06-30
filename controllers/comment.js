const Comment = require("../models/comment");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.commentById = (req, res, next, id) => {
    Comment.findById(id).exec((err, comment) => {
      if (err || !comment) {
        return res.status(404).json({
          error: "comment does not exist",
        });
      }
      req.comment = comment;
      next();
    });
  };
  
  exports.createComment = (req, res) => {
    const limit = req.body.limit ? req.body.limit : 8;
    const comment = new Comment(req.body);
    comment.save((err, data) => {
      if (!err) {
        Comment.find({product : req.body.product}).populate("user","name").populate("product","_id").limit(limit).exec((err, data) => {
          if (!err) {
            res.status(200).json(data);
          } else {
            res.status(400).json({ error: errorHandler(err) });
          }
        });
      } else {
        res.status(400).json({ error: errorHandler(err) });
      }
    });
  };
  exports.listAllCommentByProduct = (req, res) => {
    const page = parseInt(req.query.page);
    const perPage = parseInt(req.query.perPage);
    Comment.find({product : req.product._id}).populate("user","name").populate("product","_id").sort({createdAt : -1}).limit(perPage).skip(perPage * (page-1)).exec((err, data) => {
        if (!err) {
          Comment.find({product : req.product._id}).exec((err,allData) => {
            return res.status(200).json({data : data, totalRow : allData.length});
          })
        } else {
          res.status(400).json({ error: errorHandler(err) });
        }
      });
  };
  exports.listAllComment = (req, res) => {
    const page = parseInt(req.query.page);
    const perPage = parseInt(req.query.perPage);
    Comment.find().populate("user","name").populate("product","_id name").limit(perPage).skip(perPage * (page-1)).exec((err, data) => {
        if (!err) {
          Comment.find().exec((err,allData) => {
            return res.status(200).json({data : data, totalRow : allData.length});
          })
        } else {
          res.status(400).json({ error: errorHandler(err) });
        }
      });
  };
exports.deleteUserComment = (req,res) => {
  const limit = req.body.limit ? req.body.limit : 8;
  Comment.findByIdAndRemove(req.body._id).exec((err,data) => {
    if (!err) {
        Comment.find({product : req.body.product._id}).populate("user","name").populate("product","_id").limit(limit).exec((err, data) => {
          if (!err) {
            res.status(200).json(data);
          } else {
            res.status(400).json({ error: errorHandler(err) });
          }
        });
      } else {
        res.status(400).json({ error: errorHandler(err) });
      }
  })
}
exports.deleteComment = (req, res) => {
  const comment = req.comment;
      comment.remove((err, data) => {
        if (!err) {
          res.json({
            message: "Comment deleted",
          });
        } else {
          return res.status(404).json({
            error: errorHandler(err),
          });
        }
      })
  }
  exports.listAllCommentTitle = (req,res) =>{
    Comment.find({commentTitle: 1}).populate("user").populate("product").limit(5).exec((err,data) => {
      if(!err){
       return res.status(200).json(data)
      }
       else{
       return res.status(400).json({err: errorHandler(err)})
       }
    })}
    exports.addCommentTitle = (req,res) =>{
      Comment.find({commentTitle: 1}).exec((err,data) => {
        if(data !== null && data.length >= 5){
          res.status(400).json({message:"Đã quá 5 comment"})
        }
        else{
          Comment.findByIdAndUpdate(req.comment._id,{commentTitle: 1}).populate("user").populate("product").exec((err,data) => {
            if(!err){
             return res.status(200).json({message:"Đã thêm thành công",data:data})
            }
             else{
             return res.status(400).json({err: errorHandler(err)})
             }
          })
        }
      })
      }
      exports.deleteCommentTitle = (req,res) => {
        Comment.findByIdAndUpdate(req.comment._id,{commentTitle : 0}).exec((err,data) =>{
          if(!err) {
            res.status(200).json({message:"Đã xóa thành công"})
          }
          else
          res.status(400).json({err: errorHandler(err)});
        })
      }