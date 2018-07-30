const express = require('express');
var app = express();
var path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();

});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
  // res.redirect('https://www.google.com');
});
app.get('/doc', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/doc.html'));
  // res.redirect('https://www.google.com');
});


app.get('/delay/:delayValue/', (req, res) => {

  if (req.params.delayValue === 'random') {
    req.params.delayValue = randomDelayInMS();
  } else if (!isNaN(req.params.delayValue)) {
    setTimeout(() => {
      res.send({
        status: 200,
        delay: `${req.params.delayValue} ms`,
        message: `Mock response from Flash`
      });
    }, req.params.delayValue);
  } else {
    res.status(500).send(`Delay value should be valid number(in milliseconds) or 'random'`);
  }

})

app.get('/delay/:delayValue/url/:urlValue*', (req, res) => {

  if (req.params.delayValue === 'random') {
    req.params.delayValue = randomDelayInMS();
  } else if (!isNaN(req.params.delayValue)) {
    res.status(302);
    setTimeout(() => {
      if (req.params[0].length) {
        res.redirect(`${req.params.urlValue}${req.params[0]}`);
      } else {
        res.redirect(`http://${req.params.urlValue}`);
      }
    }, req.params.delayValue);
  } else {
    res.status(500).send(`Delay value should be valid number(in milliseconds) or 'random'`);
  }

});

app.get('*', function (req, res) {
  res.redirect('/');
});
var port = process.env.port || 3000;
app.listen(port, () => console.log(`Flash listening on port ${port}!`));

function randomDelayInMS() {
  // random delay in milliseconds between 0 to 10000 ms
  return (Math.floor(Math.random() * 10) + 0) * 1000;
}