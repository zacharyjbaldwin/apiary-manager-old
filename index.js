// Node modules
const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;
const morgan = require('morgan');
const path = require('path');
// const session = require('express-session');
const session = require('cookie-session');

// Custom modules
const config = require('./config.json');
const routes = require('./routes/routes');

// Handlebars setup
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Express setup
const app = express();
app.set('view engine', hbs);

// Express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules'))); // This line alllows us to reference things like bootstrap

// Routing
app.use('/', routes);

app.use((req, res) => {
    res.send('That\'s an problem.');
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});

