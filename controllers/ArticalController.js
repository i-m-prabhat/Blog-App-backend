const jwt = require('jsonwebtoken');
const Article = require('../model/Artical');
const Comment = require('../model/Comment');
const User = require('../model/User');

const ArticalController = {
    getArtical: async (req, res) =>
    {
        try
        {
            let query = {};
            if (req.query.category)
            {
                query.category = req.query.category;
            }
            if (req.query.tag)
            {
                query.tags = req.query.tag;
            }
            const articles = await Article.find(query).populate('author').populate('comments');
            res.status(200).json(articles);
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    createArtical: async (req, res) =>
    {
        try
        {
            const decoded = jwt.verify(req.headers.authorization, 'secretkey');
            const author = await User.findById(decoded.userId);

            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content,
                author: author._id,
                category: req.body.category,
                tags: req.body.tags,
            });

            await newArticle.save();

            res.status(201).json({ message: 'Article created' });
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    editArtical: async (req, res) =>
    {
        try
        {
            const decoded = jwt.verify(req.headers.authorization, 'secretkey');
            const author = await User.findById(decoded.userId);

            const article = await Article.findById(req.params.id);
            if (!article)
            {
                return res.status(404).json({ message: 'Article not found' });
            }
            if (article.author.toString() !== author._id.toString())
            {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            article.title = req.body.title;
            article.content = req.body.content;
            article.category = req.body.category;
            article.tags = req.body.tags;

            await article.save();

            res.status(200).json({ message: 'Article updated' });
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteArtical: async (req, res) =>
    {
        try
        {
            const decoded = jwt.verify(req.headers.authorization, 'secretkey');
            const author = await User.findById(decoded.userId);

            const article = await Article.findById(req.params.id);
            if (!article)
            {
                return res.status(404).json({ message: 'Article not found' });
            }
            if (article.author.toString() !== author._id.toString())
            {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            await Comment.deleteMany({ article: article._id });

            await article.deleteOne();

            res.status(200).json({ message: 'Article deleted' });
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    createComment: async (req, res) =>
    {
        try
        {
            const decoded = jwt.verify(req.headers.authorization, 'secretkey');
            const author = await User.findById(decoded.userId);

            const article = await Article.findById(req.params.id);
            if (!article)
            {
                return res.status(404).json({ message: 'Article not found' });
            }

            const newComment = new Comment({
                article: article._id,
                author: author._id,
                name: req.body.name,
                content: req.body.content,
            });

            await newComment.save();

            article.comments.push(newComment._id);
            await article.save();

            res.status(201).json({ message: 'Comment created' });
        } catch (err)
        {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getComment: async (req, res) =>
    {
        try
        {
            const article = await Article.findById(req.params.id).populate('comments');
            res.status(200).json(article.comments);
        } catch (error)
        {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

}

module.exports = ArticalController;