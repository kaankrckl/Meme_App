var Meme = require("../models/memes");
var Comment = require("../models/comment");
var middlewareObj = {};

// Colt Steele Web developer bootcamp used while writing this part https://github.com/Colt/yelp-camp-refactored
middlewareObj.checkMemeOwnership = function(req, res, next){
     if(req.isAuthenticated()){
               Meme.findById(req.params.id, function(err, foundMeme){
           if(err){
               req.flash("error", "Meme not found");
               res.redirect("back");
           }
           else{
               //does user own the meme?
               if(foundMeme.author.id.equals(req.user._id)){
                   next();
               }
               else{
                   req.flash("error", "You don't have permisson");
                   res.redirect("back");
               }
               
           }
       });
    }
    else{
        req.flash("error", "You need to be logged in first")
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
     if(req.isAuthenticated()){
               Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }
           else{
               //does user own the comment?
               if(foundComment.author.id.equals(req.user._id)){
                   next();
               }
               else{
                   req.flash("error", "You don't have permisson");
                   res.redirect("back");
               }
               
           }
       });
    }
    else{
        req.flash("error", "You need to be logged in first");
        res.redirect("back");
    }
};
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in first");
    res.redirect("/login");
};

 module.exports = middlewareObj;
 
 
 