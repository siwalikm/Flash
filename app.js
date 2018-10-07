var express = require('express');

var app = express();
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

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

function timerFunction(res, data, type, delay) {
    setTimeout(() => {
        if (type === 'typeDelay') {
            data.delay = `${delay} ms`;
            res.send(data);
        } else if (type === 'typeUrl') {
            res.status(302).redirect(data);
        }
    }, delay);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/doc.html'));
});


app.get('/delay/:delayValue/', (req, res) => {
    const data = {
        status: 200,
        message: 'Mock response from Flash'
    };

    if (req.params.delayValue === 'random') {
        (timerFunction(res, data, 'typeDelay', randomDelayInMS()));
    } else if (!isNaN(req.params.delayValue)) {
        (timerFunction(res, data, 'typeDelay', req.params.delayValue));
    } else {
        res.status(500).send('Delay value should be valid number(in milliseconds) or "random"');
    }

});

app.get('/delay/:delayValue/url/:urlValue*', (req, res) => {
    var url = `${req.params.urlValue}${req.params[0]}`;
    if (!url.match('(http|https)://') && !url.match('://')) {
        url = `http://${url}`;
    }

    if (req.params.delayValue === 'random') {
        (timerFunction(res, url, 'typeUrl', randomDelayInMS()));
    } else if (!isNaN(req.params.delayValue)) {
        (timerFunction(res, url, 'typeUrl', req.params.delayValue));
    } else {
        res.status(500).send('Delay value should be valid number(in milliseconds) or "random"');
    }

});

app.get('*', function (req, res) {
    res.redirect('/');
});

//  SAMPLE EXAMPLE START 
app.post('/sample', (req, res)=> {
    res.send(`Response: ${req.body.id}`);
});
//  SAMPLE EXAMPLE END

app.set('port', process.env.PORT || 3000);
let server = app.listen(app.get('port'), () => {
    // eslint-disable-next-line
    console.log('Flash ⚡⚡⚡ is listening to port ' + app.get('port'));
});

module.exports = server;