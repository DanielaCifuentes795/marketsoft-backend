const express = require('express');
const DatabaseSync = require('./src/config/sync');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

DatabaseSync.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Server could not start:', error.message);
    });