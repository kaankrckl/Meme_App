var express = require("express");
var router  = express.Router(); 
var Meme    = require("../models/memes");
var middlewareObj = require("../middleware/");

router.get("/memes", function(req, res){
       // Get all the memes from DB
       Meme.find({}, function(err, allMemes){
           if(err){
               console.log(err);
           }
           else{
               res.render("memes/index", {memes: allMemes});
           }
       });
});

router.post("/memes", middlewareObj.isLoggedIn, function(req, res){
    var description = req.body.description;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMeme = {description: description, image: image, author: author};
    //create a new meme and save it to DB
    Meme.create(newMeme, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            console.log(newlyCreated);
            res.redirect("/memes");
        }
    });

});

router.get("/memes/new", middlewareObj.isLoggedIn, function(req, res) {
    res.render("memes/new");
});

// Shows more info about the meme
router.get("/memes/:id", function(req, res) {
    //find the meme with the given id
    Meme.findById(req.params.id).populate("comments").exec( function(err, foundMeme){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundMeme);
                //render show template with that meme
            res.render("memes/show", {memes: foundMeme});
        }
    });

});

//EDIT MEME ROUTE
router.get("/memes/:id/edit", middlewareObj.checkMemeOwnership, function(req, res) {

               Meme.findById(req.params.id, function(err, foundMeme){
                   res.render("memes/edit", {memes: foundMeme});
       });

});
//UPDATE MEME ROUTE
router.put("/memes/:id", middlewareObj.checkMemeOwnership, function(req, res){
    Meme.findByIdAndUpdate(req.params.id, req.body.memes, function(err, updatedMeme){
        if(err){
            res.redirect("/memes");
        }
        else{Meme.findByIdAndUpdate(req.params.id,
        {
            $pull:{
                comments: req.params.comment_id
            }
        },function(err, data){
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/memes/" + req.params.id);
            }
        })
            
        }
    });
});
//DELETE MEME ROUTE
router.delete("/memes/:id", middlewareObj.checkMemeOwnership, function(req, res){
    Meme.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/memes");
        }
        else{
            res.redirect("/memes");
        }
    })
});



module.exports = router;
