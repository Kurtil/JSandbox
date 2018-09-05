let User = require('../models/user.model');
let jwtUtils = require('../utils/jwt.utils')

module.exports = {
    readAll: function (req, res) {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch(() => res.status(500).json({ "error": "could not find Users" }));
    },
    register: async (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ "error": "neither username or password could be null" });
        }
        let user = await User.find({ "username": req.body.username });
        if (user.length > 0) return res.status(409).json({ "error": `User with username ${req.body.username} already exists!` });

        const newUser = new User({ username: req.body.username, bio: req.body.bio, password: req.body.password });
        let savedUser;
        try {
            savedUser = await newUser.save();
        } catch (err) {
            return res.status(500).json(err)
        }

        savedUser.password = undefined; // hide password
        res.status(200).json(savedUser);
    },
    login: async (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ "error": "missing parameters!" });
        }
        // find user and compare passwords
        let user;
        try {
            user = await User.findOne({ "username": req.body.username });
        } catch {
            return res.status(400).json({ "error": "error retrieving user" });
        }
        if (!user) return res.status(400).json({ "error": "user does not exist!" });

        if (user.password === req.body.password) {
            res.status(200).json(
                {
                    "username": user.username,
                    "token": jwtUtils.generateTokenForUser({ "username": user.username })
                });
        } else {
            res.status(400).json({ "error": "bad credential" });
        }
    },
    update: async (req, res) => {

        if (!req.body.bio) return res.status(400).json({ "error": "Bio could not be null!" });

        let authorizationHeader = req.headers['authorization'];
        let username = jwtUtils.getUserId(authorizationHeader);

        if (!username) return res.status(400).json({ "error": "Unauthorized!" });

        let user = await User.findOneAndUpdate({ "username": username }, { "$set": { "bio": req.body.bio } });
        if (!user) {
            res.status(400).json({ "error": "User do not exist..." })
        } else {
            res.status(200).json({ "success": "User updated successfully! New bio :P" })
        }
    }
}