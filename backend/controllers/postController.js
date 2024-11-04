const postModel = require('../models/Post');
const userModel = require('../models/User');
const categoryModel = require('../models/Category');

const postcreate = async (req, res) => {
    const { title, url, author, category } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const existurl = await postModel.findOne({ url });
        if (existurl) {
            return res.status(400).json({ msg: 'post url already exist' });
        }
        const user = await userModel.findById(author);
        const catname = await categoryModel.findById(category);

        const post = await postModel.create({
            title, url, author: user._id, category: catname._id, image
        })

        user.Post.push(post._id);
        await user.save();

        res.status(200).json({ post, msg: 'post create success' });

    } catch (error) {
        res.status(400).json({ error, msg: 'post create failed' });
    }
}

const postlike = async (req, res) => {

    const { postId, userId } = req.body;

    try {
        const user = await userModel.findById(userId);
        const post = await postModel.findById(postId);
        if (!post.likes.includes(userId)) {
            post.likes.push(user._id);
            await post.save();
        }

        res.status(200).json({ user, post, msg: 'user like this post' });
    } catch (error) {
        res.status(400).json({ error, msg: 'user error' });
    }
}

const postget = async (req, res) => {
    try {
        const post = await postModel.find().populate(['author', 'category']);
        res.status(200).json({ post, msg: 'post fetch' })
    } catch (error) {
        res.status(400).json({ post, msg: 'post not fetch' })
    }
}

const postuserget = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.params.username });
        const post = await postModel.find({ author: user._id }).populate(['author', 'category']);
        res.status(200).json({ user, post, msg: 'post fetch by username' });
    } catch (error) {
        res.status(200).json({ error, msg: 'post fetch failed' });
    }
}




module.exports = { postcreate, postget, postuserget, postlike };