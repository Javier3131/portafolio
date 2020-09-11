const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

var nodemailer = require('nodemailer');

app.post('/email', (req, res) => {
  console.log('Hola desde el post email');

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
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: error });
    } else {
      //   console.log('Email sent: ' + info.response);
      res.json({
        message: `Hola desde el post email`,
        req: req,
        info: info.response,
      });
    }
  });

  //   const newBlog = {
  //     autor: req.body.autor,
  //     contenido: req.body.contenido,
  //     titulo: req.body.titulo,
  //     createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  //   };

  //   db.collection('blogs')
  //     .add(newBlog)
  //     // eslint-disable-next-line promise/always-return
  //     .then((doc) => {
  //       res.json({ message: `document ${doc.id} created sucessfully` });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: `something went wrong` });
  //       console.error(err);
  //     });
});

exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });
