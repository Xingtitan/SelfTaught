import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  // Tao ra bien true/false de su dung nut Add/Close
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Organize my birthday party",
      day: "Dec 2nd at 8:00pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Take an appointment",
      day: "Dec 5th at 8:30am",
      reminder: false,
    },
    {
      id: 3,
      text: "Meet partner at the motel",
      day: "Dec 14th at 8:00pm",
      reminder: true,
    },
    {
      id: 4,
      text: "Having a family dinner",
      day: "Dec 17th at 6:30pm",
      reminder: true,
    }
  ]);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      {/* Chi khi showAddTask true thi AddTask moi hien thi */}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks To Show"
      )}
    </div>
  );
}

export default App;
