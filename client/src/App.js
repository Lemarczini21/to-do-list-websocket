import List from './components/List/List';
import TaskForm from './components/TaskForm/TaskForm';

const App = () => {
  return (
    <div className='App'>
      <header>
        <h1>ToDoList App</h1>
      </header>
      <section className='tasks-section' id='tasks-section'>
        <h2>Tasks</h2>
        <List />
        <TaskForm />
      </section>
    </div>
  );
};

export default App;
