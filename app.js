const express = require("express");
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:admin@cluster0.1kbdg.mongodb.net/BlogSite?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogschema = {
  title : String,
  post : String,
};

const blog = mongoose.model("blog", blogschema);


app.get("/", function (req, res) {

    blog.find({}, function(err, inputdata){
        if(err){
            console.log(err);
        }else{};

        
        
        res.render("home", {inputdata: inputdata});

    }); 
});


app.get("/compose", function (req, res) {
  res.render("compose");
});


app.get('/post', function (req, res){
  res.render("post");
});

app.get("/post/:id", function (req, res){
    const webtitle = req.params.id;

    blog.findOne({_id: webtitle}, function(err, found){
        res.render("post", {
          title: found.title,
          post: found.post
        });
    });
});
  

app.get("/404page", function(req, res){
  res.render("404page");
});

app.post("/", function (req, res) {
  const title_name = req.body.titlename;
  const post_name = req.body.postname;

  const blog4 = new blog({
    title: title_name,
    post: post_name,
  });
  blog4.save();
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("server started");
});






