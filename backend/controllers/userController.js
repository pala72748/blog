const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const existuser = await userModel.findOne({ username });
        const existemail = await userModel.findOne({ email });
        if (existuser) {
            return res.status(400).json({ msg: 'Username already taken' });
        }
        if (existemail) {
            return res.status(400).json({ msg: 'Email already taken' });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username, email, password: hashpassword, image,
        })
        res.status(200).json({ user, msg: 'user register success' })
    } catch (error) {
        res.status(400).json({ error, msg: 'user register fail' })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Email not register' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'invalid password' });
        };

        const token = await jwt.sign({ id: user._id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: '6hr' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 6 * 60 * 60 * 1000,
        });

        res.status(200).json({ user, token, msg: 'user login success' });

    } catch (error) {
        res.status(400).json({ error, msg: 'user login fail' })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ msg: 'user logout success' })
    } catch (error) {
        res.status(200).json({ error, msg: 'user not logout' })
    }
}

const getallusers = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json({ user, msg: 'user fetch' })
    } catch (error) {
        res.status(400).json({ error, msg: 'user fetch failed' })
    }
}

module.exports = { register, login, logout, getallusers };