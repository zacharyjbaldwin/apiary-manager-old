var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome!');
});

router.get('/login', (req, res) => {
    let message;
    if (req.query.reason) {
        switch (req.query.reason) {
            case 'noSession':
                message = 'You must be logged in to do that!'
                break;
        }
    }

    res.render('login.hbs', {
        message: message
    });
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/?message=loggedOut');
});

router.get('/addhive', (req, res) => {
    if (req.session.username == null) {
        res.redirect('/login?reason=noSession&redirect=addhive');
    } else {
        res.send('TODO: add new hive form');
    }
});

router.get('/hives', (req, res) => {
    if (req.session.username == null) {
        res.redirect('/login?reason=noSession&redirect=hives');
    } else {
        res.send('TODO: add hives list');
    }
});

// FAKE SESSION SETTINGS
router.get('/session/set/:username', (req, res) => {
    if (req.params.username) {
        req.session.username = req.params.username;
        res.send(`Set user session to ${req.params.username}`);
    } else {
        res.send('No user given.');
    }
});

router.get('/session/get', (req, res) => {
    if (req.session.username) {
        res.send(req.session.username);
    } else {
        res.send('No session.');
    }
});

router.get('/session/kill', (req, res) => {
    req.session = null;
    res.send('Killed session.');
});

module.exports = router;