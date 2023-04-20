const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/User");

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
            res.status(500).json({ message: 'Internal server error' });
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

            res.status(200).json({
                token: token,
                message: "User Login Successfully",
                error: false
            });
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UserController;