var express = require('express');

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin,X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


function randomDelayInMS() {
    // random delay in milliseconds between 0 to 10000 ms
    return (Math.floor(Math.random() * 10) + 0) * 1000;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/doc.html'));
});


app.get('/delay/:delayValue/', (req, res) => {

    if (req.params.delayValue === 'random') {
        req.params.delayValue = randomDelayInMS();
    } else if (!isNaN(req.params.delayValue)) {
        setTimeout(() => {
            res.send({
                status: 200,
                delay: `${req.params.delayValue} ms`,
                message: 'Mock response from Flash'
            });
        }, req.params.delayValue);
    } else {
        res.status(500).send('Delay value should be valid number(in milliseconds) or "random"');
    }

});

app.get('/delay/:delayValue/url/:urlValue*', (req, res) => {
    var url = `${req.params.urlValue}${req.params[0]}`;

    if (req.params.delayValue === 'random') {
        req.params.delayValue = randomDelayInMS();
    } else if (!isNaN(req.params.delayValue)) {
        setTimeout(() => {

            if (!url.match('(http|https)://') && !url.match('://')) {
                url = `http://${url}`;
            }
            res.redirect(url);
        }, req.params.delayValue);
    } else {
        res.status(500).send('Delay value should be valid number(in milliseconds) or "random"');
    }

});

app.get('*', function (req, res) {
    res.redirect('/');
});
app.set('port', process.env.PORT || 3000);
// eslint-disable-next-line
app.listen(app.get('port'), () => console.log('Flash listening on port ' + app.get('port')));