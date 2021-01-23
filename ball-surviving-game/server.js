const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('scripts'));
app.use(express.static('resources'));
app.use(express.static('styles'));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`Game runs on http://localhost:${port}`));