const router = require('express').Router();
const Catagory = require('../models/Catagory');


router.post('/',async (req,res)=>{

    try {
        const newCat = new Catagory(req.body);
        const savedCat = await newCat.save();

        res.status(200).json(savedCat)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/', async (req,res)=>{

    try {
        const cat = await Catagory.find()
        res.status(200).json(cat);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;

