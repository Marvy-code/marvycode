const express = require('express');
const app = express();

const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://marvycode21:marvycode33@cluster0.rlzgd.mongodb.net/marvycode?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !' + error));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userRouter = require('./routes/userRouter');

app.use('/api/auth', userRouter);

module.exports = app;