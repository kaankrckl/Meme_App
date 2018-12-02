var express = require("express");
var router  = express.Router(); 
var Meme    = require("../models/memes");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware/");
//ADD COMMENTS
// router.get("/memes/:id/comments/new", middlewareObj.isLoggedIn, function(req, res) {
//     Meme.findById(req.params.id, function(err, memes){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.render("comments/new", {memes: memes});            
//         }
//     });
// });

router.post("/memes/:id/comments", middlewareObj.isLoggedIn, function(req, res){
    //lookup meme using ID
    Meme.findById(req.params.id, function(err, memes) {
        if(err){
            console.log(err);
            res.redirect("/memes");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    memes.comments.push(comment);
                    memes.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/memes/" + memes._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
});
//Comments Edit Route
router.get("/memes/:id/comments/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {memes_id: req.params.id, comment: foundComment});
        }
    });
});
//Comments Update Route
router.put("/memes/:id/comments/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/memes/" + req.params.id);
        }
    });
});
//Comment Delete Route
/*router.delete("/memes/:id/comments/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){

   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       }
       else{
           req.flash("success", "Comment is deleted successfully");
           res.redirect("/memes/" + req.params.id);
       }
   })
});*/
router.delete("/memes/:id/comments/:comment_id", middlewareObj.isLoggedIn, middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Couldn't find comment!");
            res.redirect("/memes/"+ req.params.id);
        } else {
            Meme.findByIdAndUpdate(req.params.id, {
                $pull: {
                    comments: req.params.comment_id
                }
            }, function (err, meme){
                if (err) {
                    console.log(err);
                } else {
                    req.flash("success", "Succesfully removed comment!");
                    res.redirect("/memes/"+ req.params.id);
                }
            });
        }
    });
});





module.exports = router;