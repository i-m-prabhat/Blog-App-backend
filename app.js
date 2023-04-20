const express = require('express');
const bodyparser = require('body-parser');
const indexRoute = require("./routes/indexRoute");
const userRoute = require("./routes/userRoute")

const app = express();


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/', indexRoute);
app.use('/api', userRoute);

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