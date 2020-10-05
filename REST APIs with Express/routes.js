const express = require('express');
const router = express.Router();
const records = require('./records');

function asyncHandler(callback) {
    return async (req, res, next) => {
        try {
            await callback(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

router.get('/quotes', async (req, res) => {
    const quotes = await records.getQuotes();
    res.json(quotes);
});

router.get('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({ message: "Quote not found." })
    }
}));

router.get('/quotes/quote/random', asyncHandler(async (req, res, next) => {
    const quote = await records.getRandomQuote();
    res.json(quote);
}));

router.post('/quotes', asyncHandler(async (req, res, next) => {
    if (req.body.author && req.body.quote) {
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.status(201).json(quote);
    }
    else {
        res.status(404).json({ message: "Quote and auther required." })
    }
}));

router.put('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.updateQuote(req.params.id);
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Quote not found." })
    }
}));

router.delete('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        await records.deleteQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Quote not found." })
    }
}));

module.exports = router;
