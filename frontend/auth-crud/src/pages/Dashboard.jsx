import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(data);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // create task
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/v1/task",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      fetchTasks(); // refresh
    } catch (error) {
      alert("Failed to create task");
    }
  };
  // handle update
  const handleUpdate = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/task/${id}`,
        {
          status: currentStatus === "pending" ? "completed" : "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchTasks();
    } catch (error) {
      alert("Failed to update task");
    }
  };

  // delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setEditForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/v1/task/${selectedTask._id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      alert("Failed to update task");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-blue-500">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Create Task */}
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 bg-slate-800 rounded"
        />
        <button className="bg-blue-600 px-4 rounded cursor-pointer">Add</button>
      </form>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-slate-800 p-3 rounded flex justify-between"
          >
            <span
              className={
                task.status === "completed" ? "line-through text-gray-400" : ""
              }
            >
              {task.title}
            </span>
            <div className="flex gap-3">
              {/* <button
                onClick={() => handleUpdate(task._id, task.status)}
                className="text-green-400"
              >
                {task.status === "pending" ? "Done" : "Undo"}
              </button> */}

              <button
                onClick={() => openModal(task)}
                className="text-blue-400 cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-400 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal code */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-slate-800 p-6 rounded w-80 transform transition-all duration-200 scale-100 animate-[fadeIn_0.2s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg text-blue-500 mb-4">Edit Task</h2>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="w-full p-2 bg-slate-700 rounded"
              />

              <input
                type="text"
                placeholder="Description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="w-full p-2 bg-slate-700 rounded"
              />

              <select
                value={editForm.status}
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value })
                }
                className="w-full p-2 bg-slate-700 rounded"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 px-3 py-1 rounded cursor-pointer"
                >
                  Cancel
                </button>

                <button className="bg-blue-600 px-3 py-1 rounded cursor-pointer">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
