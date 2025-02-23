import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Delete, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Swal from 'sweetalert2';

const Home = () => {

  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [category, setCategory] = useState("todo");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const axiosPublic = useAxiosPublic();

  const fetchTasks = async () => {
    try {
      const { data } = await axiosPublic("/api/tasks");
      console.log("Fetched Tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    if (editingTaskId) {
      try {
        await axiosPublic.put(`/api/tasks/${editingTaskId}`, {
          title: taskInput,
          category,
        });
        Swal.fire({
          title: 'Task Updated!',
          text: 'Your task has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        fetchTasks();
      } catch (error) {
        console.error("Task update failed:", error);
      }
    } else {
      try {
        const { data } = await axiosPublic.post("/api/tasks", {
          title: taskInput,
          category,
          email: user ? user.email : "test@gmail.com",
        });
        if (data) {
          fetchTasks();
          Swal.fire({
            title: 'Task Added!',
            text: 'Your new task has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error("Task creation failed:", error);
      }
    }

    setTaskInput("");
    setEditingTaskId(null);
  };

  const TaskColumn = ({ title, category }) => {
    const [, drop] = useDrop({
      accept: "TASK",
      drop: async (item) => {
        const updatedTasks = tasks.map(task => {
          if (task._id === item.id) {
            return { ...task, category };
          }
          return task;
        });

        setTasks(updatedTasks);
        try {
          await axiosPublic.put(`/api/tasks/${item.id}`, {
            category,
          });
          Swal.fire({
            title: 'Task Moved!',
            text: 'The task has been moved successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } catch (error) {
          console.error("Failed to update task category:", error);
        }
      },
    });

    return (
      <div ref={drop} className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[200px]">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {tasks
          .filter((task) => task.category === category)
          .map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
    );
  };

  const TaskCard = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id: task._id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    const deleteTask = async () => {
      try {
        await axiosPublic.delete(`/api/tasks/${task._id}`);
        fetchTasks();
        Swal.fire({
          title: 'Task Deleted!',
          text: 'The task has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    };

    const editTask = () => {
      setTaskInput(task.title);
      setEditingTaskId(task._id);
    };

    return (
      <div ref={drag} className={`p-3 bg-white shadow-md rounded-md flex justify-between items-center my-2 ${isDragging ? "opacity-50" : "opacity-100"}`}>
        <p className="text-sm font-medium">{task.title}</p>
        <div className="flex space-x-2">
          <button onClick={editTask} className="p-1 hover:bg-gray-200 rounded-full">
            <Edit />
          </button>
          <button onClick={deleteTask} className="p-1 hover:bg-gray-200 rounded-full">
            <Delete />
          </button>
        </div>
      </div>
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="p-4 flex justify-center">
          <form onSubmit={addTask} className="flex w-full max-w-md bg-white shadow-md rounded-md p-3">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="flex-1 p-1 border rounded-md focus:outline-none"
              placeholder="Add a task..."
              maxLength="50"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="ml-2 p-1 border rounded-md">
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="ml-1 bg-blue-500 text-white px-3 py-2 rounded-md">{editingTaskId ? 'Update' : '+ Add'}</button>
          </form>
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <TaskColumn title="To Do" category="todo" />
          <TaskColumn title="Doing" category="doing" />
          <TaskColumn title="Done" category="done" />
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
