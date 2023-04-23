const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const Article = require('../model/Artical');

const UserController = {
    signup: async (req, res) =>
    {
        try
        {
            const user = await User.findOne({ email: req.body.email });
            if (user)
            {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });

            await newUser.save();

            const token = jwt.sign({ userId: newUser._id }, 'secretkey');

            res.status(201).json({
                token: token,
                message: "User Created Successfully",
                error: false
            });
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    login: async (req, res) =>
    {
        try
        {
            const user = await User.findOne({ email: req.body.email });
            if (!user)
            {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch)
            {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user._id }, 'secretkey');

            const articles = await Article.find({ author: user._id });

            res.status(200).json({
                token: token,
                // message: "User Login Successfully",
                message: `Welcome Back ${user.name}`,
                name: user.name,
                email: user.email,
                articles: articles,
                error: false
            });
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    allUser: async (req, res) =>
    {
        try
        {
            const user = await User.find({});

            res.status(200).json({
                message: "User Found Successfully",
                data: user,
                error: false
            });
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    articleUser: async (req, res) =>
    {
        try
        {
            const { email } = req.params;
            const user = await User.findOne({ email }); // findOne instead of find

            if (!user)
            {
                return res.status(404).send("User not found");
            }
            console.log({ user: user._id });
            const userArticles = await Article.find({ user: user.email }).populate("user"); // use _id instead of email

            res.send(userArticles);
        } catch (err)
        {
            console.error(err);
            res.status(500).send("Server error");
        }
    }
}

module.exports = UserController;