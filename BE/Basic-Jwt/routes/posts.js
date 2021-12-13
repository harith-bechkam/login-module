const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/posts', verify, (req, res) => {
    res.json(
        {
            userdetails: {
                details: req.user
            },
            posts: {
                title: 'my first posts',
                description: 'random data random data random data random data random data'
            }
        })
    // res.send(req.user)
});

module.exports = router;