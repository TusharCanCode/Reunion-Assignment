const router = require('express').Router();
const Post = require('../models/Post');
const fetchUser = require('../middleware/fetchuser');

//Route-1: Create a new post
router.post('/', fetchUser, async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.Title,
            description: req.body.Description,
            userId: req.user.id
        });
        const { userId, updatedAt, likes, unlikes, comments, ...other } = post._doc;
        other.createdAt = other.createdAt.toUTCString();
        res.status(200).json(other);

    } catch (err) {
        const errors = handleErrors(err);
        return res.status(400).json({ error: errors });
    }
})

//Route-2: Deleting an existing post
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: { alert: "Post Not Found" } });

        if (post.userId.toString() !== req.user.id)
            return res.status(403).json({ error: { alert: "You cannot delete this post" } });

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: { alert: "Post has been deleted successfully" } });

    } catch (err) {
        return res.status(400).json({ error: { alert: err.message } });
    }
});

//Route-3: Fetching an existing post
router.get('/:id', fetchUser, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments');
        if (!post) return res.status(404).json({ error: { alert: "Post Not Found" } });

        const postData = { ...post._doc, likes: post.likes.length, unlikes: post.unlikes.length, createdAt: post.createdAt.toUTCString(), updatedAt:post.updatedAt.toUTCString() }
        return res.status(200).json(postData);

    } catch (err) {
        return res.status(400).json({ error: { alert: err.message } });
    }
});

//Utility Functions
function handleErrors(err) {
    const errors = { userId: '', title: '', decription: '', alert: '' };
    if (err.message.includes("Post validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports = router;