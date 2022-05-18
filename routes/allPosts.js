const router = require('express').Router();
const Post = require('../models/Post');
const fetchUser = require('../middleware/fetchuser');

//Route-1: Getting user's all posts
router.get('/', fetchUser, async (req, res) => {
    try {
        const userPosts = await Post.find({ userId: req.user.id }).sort({ createdAt: 'desc' }).populate('comments');
        let userPostsArr = [];
        userPosts.map(post => {
            let postData = {
                _id: post._id,
                title: post.title,
                description: post.description,
                created_at: post.createdAt.toUTCString(),
                comments: post.comments,
                likes: post.likes.length,
                unlikes: post.unlikes.length
            }
            userPostsArr.push(postData);
        })
        return res.status(200).json(userPostsArr);
    } catch (err) {
        return res.status(500).json({ error: { alert: err.message } });
    }
})

module.exports = router;