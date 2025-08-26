import './App.css'
import Header from './Components/Header/Header';
import TaskBoard from './Components/TaskArea/TaskBoard/TaskBoard';

function App() {
  return (
    <section className='layout'>
      <Header />
      <TaskBoard />
    </section>
  );
}

export default App
