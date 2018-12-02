var mongoose = require("mongoose");

//SCHEMA SETUP



var memeSchema = new mongoose.Schema({
    description: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
     comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      
   ]
   
});

module.exports = mongoose.model("Meme", memeSchema);