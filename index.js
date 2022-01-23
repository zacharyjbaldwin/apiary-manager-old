// Node modules
const cookieParser = require('cookie-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
// const session = require('express-session');
const session = require('cookie-session');

// Custom modules
const config = require('./config.json');
const routes = require('./routes/routes');

// Express setup
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

// Routing
app.use('/', routes);

app.use((req, res) => {
    res.send('That\'s an error.');
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});

