const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');



router.post('/', async (req, res) => {

    try {
        // console.log('Post')
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {

            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                    { $set: req.body },
                    { new: true });
                res.status(200).json(updatedPost);

            } catch (error) {

            }
        } else {
            res.status(401).json('You can Update only your post')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


router.delete('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {

            try {
                await post.delete()
                res.status(200).json('You Post has been deleted successfully');

            } catch (error) {
                res.status(401).json(error)
            }
        } else {
            res.status(401).json('You can Delete only your post')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


// GET all posts

router.get('/', async (req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;

    try {

        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;