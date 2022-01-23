var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome!');
});

router.get('/:user/addhive', (req, res) => {
    res.send(`Adding hive to ${req.params.user}`)
});

router.get('/:user/hives', (req, res) => {
    res.send(`Listing hives of ${req.params.user}`)
});

// FAKE SESSION SETTINGS
router.get('/session/set/:user', (req, res) => {
    if (req.params.user) {
        req.session.name = req.params.user;
        res.send(`Set user session to ${req.params.user}`);
    } else {
        res.send('No user given.');
    }
});

router.get('/session/get', (req, res) => {
    if (req.session.name) {
        res.send(req.session.name);
    } else {
        res.send('No session.');
    }
});

router.get('/session/kill', (req, res) => {
    req.session = null;
    res.send('Killed session.');
});

module.exports = router;