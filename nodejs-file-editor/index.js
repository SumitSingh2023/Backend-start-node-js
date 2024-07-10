const path = require("path");
const fs = require('fs')

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

function readTheFile(file) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('==>', data)
        }
    })
}

function deleteFile(path) {
    fs.unlink(path, (err) => {
        if (err) {
            console.log(err)
        }
    })

}

function createFile(file) {
    fs.writeFile(file, ' ', (err) => {
        if (err) {
            console.log('==>', err)
        }
    })

}

function appendFile(file, content) {
    fs.appendFile(file, content + '\n', 'utf-8', (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`content appended to the file ${file}`)
        }
    })
}

function rename(file, content) {
    fs.rename(file, content, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`file ${file} renamed to ${content}`)
        }
    });

}

function list(directory) {
    try {
        const files = fs.readdirSync(directory);
        files.forEach(file => {
            console.log(file);
        });
    } catch (err) {
        console.log('Error listing directory:', err.message);
    }
}

switch (operation) {
    // complete the fillowing function.
    case 'read':
        if (file) {
            readTheFile(file)
        }
        break
    case 'delete':
        if (path) {
            deleteFile(file)
        }
        break
    case 'create':
        if (file) {
            createFile(file)
        }
        break
    case 'append':
        if (file && content) {
            appendFile(file, content)
        }
        break
    case 'rename':
        if (file && content) {
            rename(file, content)
        }
        break
    case 'list':
        if (path) {
            list(path)
        } else {
            console.log("Please specify the directory to list.");
        }
        break

    default:
        console.log(`Invalid operation '${operation}'`);
}
