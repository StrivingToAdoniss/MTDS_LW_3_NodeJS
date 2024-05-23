const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the selected script
app.get('/script', (req, res) => {
    const scriptName = req.query.name;
    let filePath;

    switch (scriptName) {
        case 'bee':
            filePath = path.join(__dirname, 'public', 'bee_movie_script.txt');
            break;
        case 'shrek':
        default:
            filePath = path.join(__dirname, 'public', 'shrek_script.txt');
            break;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading script file: ${filePath}`, err);
            res.status(500).send('Error reading script file');
        } else {
            console.log(`Successfully read script file: ${filePath}`);
            res.status(200).send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
