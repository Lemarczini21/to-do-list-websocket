const express = require('express');
const socket = require('socket.io');

const app = express();

let tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('connected', socket.id);
  socket.broadcast.emit('updateData', tasks);
  socket.on('addTask', (data) => {
    tasks.push(data);
    socket.broadcast.emit('addTask', data);
  });
  socket.on('removeTask', (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    console.log(tasks, taskId);
    socket.broadcast.emit('removeTask', taskId);
  });
});
