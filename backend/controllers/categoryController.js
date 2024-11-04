const categoryModel = require('../models/Category');
const postModel = require('../models/Post');

const categorycreate = async (req, res) => {
    const { name, url, parent } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const existurl = await categoryModel.findOne({ url });
        if (existurl) {
            return res.status(400).json({ msg: 'Category url already exist' });
        }
        const catparent = await categoryModel.findById(parent);
        const category = await categoryModel.create({
            name, url, parent: parent ? catparent._id : null, image
        })
        await category.save();
        res.status(200).json({ category, msg: 'category create success' })
    } catch (error) {
        res.status(400).json({ error, msg: 'category create failed' })
    }
}

const categoryget = async (req, res) => {
    try {
        const category = await categoryModel.find().populate('parent');
        res.status(200).json({ category, msg: 'category fetch' })
    } catch (error) {
        res.status(400).json({ error, msg: 'category not fetch' })
    }
}

const postcategoryget = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ url: req.params.url });
        const post = await postModel.find({ category: category._id }).populate(['author', 'category']);
        res.status(200).json({ category, post, msg: 'post fetch by username' });
    } catch (error) {
        res.status(200).json({ error, msg: 'post fetch failed' });
    }
}
module.exports = { categorycreate, categoryget, postcategoryget };