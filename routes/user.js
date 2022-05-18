const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const router = express.Router();

//Route-1: Current User
router.get('/', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user)
            return res.status(404).json({ error: { alert: "Not Found" } });

        else {
            const userData = { "User Name": user.userName, "Followers": user.followers.length, "Followings": user.following.length }
            return res.status(200).json(userData);
        }
    } catch (err) {
        return res.status(500).json({ error: { alert: err.message } });
    }
});

module.exports = router;