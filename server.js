const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

const tasks = [];

io.on('connection', (socket) => {
  console.log(`New socket connected on ${socket.id}`);
  socket.emit('updateData', tasks);
  socket.on('addTask', (data) => {
    const { task, id } = data;
    tasks.push({ task, id });
    socket.broadcast.emit('addTask', data);
  });
  socket.on('removeTask', (taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      io.emit('updateTask', tasks);
    }
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});
