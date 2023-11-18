
const fs = require('fs');
const path = require('path');

function ensureDirectoryExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
}

module.exports = {
    ensureDirectoryExists,
};
