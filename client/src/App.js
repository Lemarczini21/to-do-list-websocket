import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import shortid from 'shortid';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'wyjsc z psem' },
    { id: 2, name: 'nakarmic psa' },
  ]);
  const [socket, setSocket] = useState(null);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:8000');
    setSocket(socket);
    socket.on('updateData', (data) => {
      console.log('Received initial data from server:', data);
    });
    socket.on('addTask', (task) => {
      console.log('New task added:', task);
      setTasks((prevTasks) => [...prevTasks, task]);
    });
  }, []);

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (socket !== null) {
      socket.emit('removeTask', taskId);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const data = { name: taskName, id: shortid.generate() };
    addTask(data);
    setTaskName('');
    socket.emit('addTask', data);
  };

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  const addTask = (task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  return (
    <div className='App'>
      <header>
        <h1>ToDoList App</h1>
      </header>
      <section className='tasks-section' id='tasks-section'>
        <h2>Tasks</h2>
        <ul className='tasks-section__list' id='tasks-list'>
          {tasks.map((task) => (
            <li className='task' key={task.id}>
              {task.name}
              <button
                onClick={() => removeTask(task.id)}
                className='btn btn--red'
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={submitForm} id='add-task-form'>
          <input
            className='text-input'
            autoComplete='off'
            type='text'
            placeholder='Type your description'
            id='task-name'
            value={taskName}
            onChange={handleChange}
          />
          <button className='btn' type='submit'>
            Add
          </button>
        </form>
      </section>
    </div>
  );
};

export default App;
