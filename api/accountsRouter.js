const express = require('express');

const db = require('../data/dbConfig.js');
const { restart } = require('nodemon');

const router = express.Router();

router.get('/', (req, res) => {
    // SELECT * FROM accounts;
    db.select('*')
        .from('accounts')
        .then(account => res.status(200).json({ data: account }))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    // SELECT * FROM accounts WHERE id = id
    db('accounts')
        .where('id', id)
        .first()
        .then(account => res.status(200).json({ data: account }))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const accountData = req.body;
    // INSERT INTO accounts (fields...) VALUES(values...)
    db('accounts')
        .insert(accountData)
        .then((id) => res.status(201).json({ data: id }))
        .catch((err) => console.log(err));
});

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body;
    // UPDATE accounts SET field = 'new value' WHERE id = id;
    db('accounts')
        .where('id', id)
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: 'There was no record to update' })
            }
        })
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where('id', id)
        .delete()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: 'There was no record to update' });
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;