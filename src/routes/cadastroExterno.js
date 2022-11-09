const router = require('express').Router();

router.get('/', async (req, res, next) => {
    
    res.status(200).json("hi")
})


module.exports = router;