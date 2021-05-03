// https://github.com/100devs/todo-mvc-auth-local/blob/main/controllers/todos.js
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); // posts gets ../models/post proccesses using daisy chained methods
      res.render("profile.ejs", { posts: posts, user: req.user }); // renders/outputs HMTL
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); // posts gets ../models/post proccesses using daisy chained methods
      res.render("feed.ejs", { posts: posts }); // renders/outputs HMTL
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", {
        post: post,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      await Post.create({
        title: req.body.title,
        //image: ....
        description: req.body.desc,
        likes: 0,
        userId: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/posts");
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.body.params.id },
        { $inc: { likes: 1 } }
      );
      console.log("Added 1 Like");
      res.json("Added 1 Like");
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    console.log(req.params.id);
    try {
      await Post.findOneAndDelete({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
