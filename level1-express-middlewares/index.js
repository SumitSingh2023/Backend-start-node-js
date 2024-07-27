const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
morgan.token('time-taken', function (req, res) {
    return `${res.responseTime}ms`;
});
app.use(morgan(':method :status :res[content-length] - :time-taken :date[clf] HTTP/:http-version :url', {
    stream: accessLogStream,
    immediate: true,
}));
app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
});
app.get('/get-users', (req, res) => {
    res.status(200).json([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }])
});
app.post('/add-user', (req, res) => {
    res.status(201).send('User added successfully')
});
app.put('/user/:id', (req, res) => {
    res.status(201).send(`User with id ${req.params.id} updated successfully`)
});
app.delete('/user/:id', (req, res) => {
    res.status(200).send(`User with id ${req.params.id} deleted successfully`)
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});