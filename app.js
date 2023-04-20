const express = require('express');

const app = express();


app.use('/', (req, res, next) =>
{
    res.send("hello world");
});

app.use('*', (req, res) =>
{
    let fullUrl = req.protocol + "://" + req.get('host') + req.originalUrl
    res.status(404).json({
        code: 404,
        status: false,
        message: "Endpoint " + req.originalUrl + " does not exist",
        data: {
            fullUrl: fullUrl,
            method: "GET",
            endPoint: req.originalUrl,
            code: req.code,
            isSecure: (req.protocol == 'http') ? "false" : "true",
        },
        error: false
    });
})

module.exports = app;