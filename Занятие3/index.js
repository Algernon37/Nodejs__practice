const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const COUNTERS_FILE = path.join(__dirname, 'counters.json');

const readCountersFromFile = () => {
    try {
        const data = fs.readFileSync(COUNTERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { home: 0, about: 0 };
    }
};

const writeCountersToFile = (counters) => {
    fs.writeFileSync(COUNTERS_FILE, JSON.stringify(counters, null, 2));
};

let counters = readCountersFromFile();


app.get('/', (req, res) => {
    counters.home += 1; 
    writeCountersToFile(counters); 
    res.send(`<h1>Home Page</h1><p>Page Views: ${counters.home}</p>`);
});


app.get('/about', (req, res) => {
    counters.about += 1;
    writeCountersToFile(counters); 
    res.send(`<h1>About Page</h1><p>Page Views: ${counters.about}</p>`);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
