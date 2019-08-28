const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dist', './')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', './index.html'));
})
app.listen(88)