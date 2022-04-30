const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Update

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            },
                { new: true }
            );
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json('You can Only update your account');
    }
})


// Delete

router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {

        try {
            const user = User.findById(req.params.id)
            try {
                await Post.deleteMany({username:user.username})
                await User.findOneAndDelete(req.params.id);
                res.status(200).json('Your account has been deleted successfully')
            } catch (error) {
                res.status(500).json(error)
            }
        } catch (error) {
            res.status(404).json('User Not Found')
        }
    } else {
        res.status(401).json('You can only delete our account')
    }
})


// Get single user

router.get('/:id', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others) 
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports =router;