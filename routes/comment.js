const router = require('express').Router();
const Post = require('../models/Post');
const Comments = require('../models/Comment');
const fetchUser = require('../middleware/fetchuser');

//Route-1: Create a new comment
router.post('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: { alert: "Not Found" } });

        const comment = await Comments.create({
            userId: req.user.id,
            Comment: req.body.Comment
        })

        if (comment)
            await post.updateOne({ $push: { comments: comment } });
        return res.status(200).json(comment._id);

    } catch (err) {
        return res.status(400).json({ error: { alert: err.message } });
    }
});

module.exports = router;