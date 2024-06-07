const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync('users.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeUsersToFile = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

let users = readUsersFromFile();

app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    writeUsersToFile(users);
    res.status(201).json(newUser);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }
    users[userIndex] = { ...users[userIndex], ...req.body };
    writeUsersToFile(users);
    res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId);
    writeUsersToFile(users);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
