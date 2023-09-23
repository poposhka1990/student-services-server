const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'vizoviyotdelpetrsu@yandex.ru',
    pass: 'nnvtuadejqxgtdnk',
  },
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', (req, res) => {
  console.log(req);

  res.send('Root');
});

app.post('/send', (req, res) => {

  transporter.sendMail({
    from: '"Insurance Form" <vizoviyotdelpetrsu@yandex.ru>',
    to: 'popovemail1990@gmail.com',
    subject: 'Message from Node js',
    text: 'This message was sent from Node js server.',
    html: `Зис месадж сенд фром ${req.body.nameInputValue}!`,
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });

  res.send('Mail was sent!');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});