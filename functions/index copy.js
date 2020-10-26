const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

var nodemailer = require('nodemailer');

app.post('/email', (req, res) => {
  // console.log('Hola desde el post email');
  // console.log('req', req.body);
  // console.log('name', req.body.name);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'javierl.1994@gmail.com',
      pass: 'tckowqoulhmcsurj',
    },
  });

  var mailOptions = {
    from: 'javierl.1994@gmail.com',
    to: 'javierl.1994@gmail.com',
    subject: req.body.subject,
    text:
      req.body.name +
      ' - ' +
      req.body.email +
      ', message: "' +
      req.body.message +
      '"',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: error });
      // res.send();
      res.end();
    } else {
      //   console.log('Email sent: ' + info.response);
      // res.json({
      //   message: `Hola desde el post email`,
      //   req: req,
      //   info: info.response,
      // });
      res.status(200).json({ message: 'Email Sent!' });
      // res.send();
      res.end();
    }
  });
});

exports.api = functions.https.onRequest(app);
