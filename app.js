var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    flash      = require("connect-flash"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Meme       = require("./models/memes"),
    Comment    = require("./models/comment"),
    User       = require("./models/user")

    
var commentRoutes = require("./routes/comments"),
    memeRoutes    = require("./routes/memes"),
    indexRoutes    = require("./routes/index")

app.use(flash());
// PASSPORT CONFIGURATION Colt Steele Web developer bootcamp used while writing this part https://github.com/Colt/yelp-camp-refactored
app.use(require("express-session")({
    secret: "Once again Rusty wins",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

mongoose.connect('mongodb://localhost:27017/meme_data', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));



app.use(indexRoutes);
app.use(memeRoutes);
app.use(commentRoutes);





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Meme app server has started");
});