const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const router = express.Router();

//Route-1: Following an existing user
router.post('/:id', fetchuser, async (req, res) => {
    if (req.user.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);

            if (!user || !currentUser)
                return res.status(404).json({ error: { alert: "User Not Found" } });

            if (user.followers.includes(req.user.id))
                return res.status(403).json({ error: { alert: "You are already following that user" } });

            await currentUser.updateOne({ $push: { following: user.id } });
            await user.updateOne({ $push: { followers: currentUser.id } });
            return res.status(200).json({ message: { alert: "User has been followed" } });
        } catch (err) {
            return res.status(400).json({ error: { alert: err.message } });
        }
    }
    else
        return res.status(403).json({ error: { alert: "You cannot follow yourself" } })
});

module.exports = router;