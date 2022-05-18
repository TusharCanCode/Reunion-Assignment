const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchuser');

//Route-1: Dislike an existing post
router.post('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: { alert: "Post Not Found" } });

        if (post.unlikes.includes(req.user.id)) {
            await post.updateOne({ $pull: { unlikes: req.user.id } });
            return res.status(200).json({ message: { alert: "The unlike has been removed" } });
        }

        else if (post.likes.includes(req.user.id))
            await post.updateOne({ $pull: { likes: req.user.id } });

        await post.updateOne({ $push: { unlikes: req.user.id } });
        return res.status(200).json({ message: { alert: "The post has been unliked" } });

    } catch (err) {
        return res.status(400).json({ error: { alert: err.message } });
    }
});

module.exports = router;