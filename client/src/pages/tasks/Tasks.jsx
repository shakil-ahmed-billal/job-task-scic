import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Tasks = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });

  useEffect(() => {
    fetchTasks();
  }, []);



  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("/api/tasks");
      const categorizedTasks = {
        todo: data.filter(task => task.category === "To-Do"),
        inProgress: data.filter(task => task.category === "In Progress"),
        done: data.filter(task => task.category === "Done"),
      };
      setTasks(categorizedTasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceList = [...tasks[source.droppableId]];
    const destinationList = [...tasks[destination.droppableId]];
    const [movedTask] = sourceList.splice(source.index, 1);

    movedTask.category = destination.droppableId.replace("-", " ");
    destinationList.splice(destination.index, 0, movedTask);

    setTasks(prev => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    }));

    try {
      await axios.put(`/api/tasks/${movedTask._id}`, { category: movedTask.category });
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {Object.keys(tasks).map(category => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded shadow-md min-h-[300px]"
              >
                <h2 className="text-lg font-semibold mb-2">{category.replace("-", " ")}</h2>
                {tasks[category].map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-3 mb-2 rounded shadow"
                      >
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Tasks;
