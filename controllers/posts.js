// https://github.com/100devs/todo-mvc-auth-local/blob/main/controllers/todos.js
const Post = require('../models/post')

module.exports = {
    getFeed: async (req, res) => {
        try {
          const posts = await Post.find().sort({ createdAt: "desc" }).lean();
          res.render("feed.ejs", { posts: posts });
        } catch (err) {
          console.log(err);
        }
      },
    getPost: async (req,res)=>{
        console.log(req.user)
        try{
            const postItems = await User.find({userId:req.user.id})
            res.render('post.ejs', {posts: postItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createPost: async (req, res)=>{
        try{
            await Post.create({
              title: req.body.title,
              //image: ....
              description: req.body.desc, 
              likes: 0, 
              userId: req.user.id
            })
            console.log('Post has been added!')
            res.redirect('/posts')
        }catch(err){
            console.log(err)
        }
    },
    likePost: async (req, res)=>{
        try{
            await Post.findOneAndUpdate(
              { _id:req.body.params.id },
              { $inc: { "likes" : 1 } }
            )
            console.log('Added 1 Like')
            res.json('Added 1 Like')
        }catch(err){
            console.log(err)
        }
    },
    // markUnlike: async (req, res)=>{
    //     try{
    //         await Post.findOneAndUpdate({_id:req.body.postIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    deletePost: async (req, res)=>{
        console.log(req.params.id)
        try{
            await Post.findOneAndDelete(
            { _id:req.params.id })
            console.log('Deleted Post')
            res.redirect("/profile")
        }catch(err){
            console.log(err)
        }
    }
}    