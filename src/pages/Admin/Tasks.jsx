import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask } = useAdmin();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '', assignee: '', priority: 'Medium', dueDate: '', status: 'Not Started'
  });

  const toggleTaskStatus = (id, currentStatus) => {
    const statusFlow = {
      'Not Started': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'Not Started',
      'Pending': 'In Progress',
    };
    updateTask(id, { status: statusFlow[currentStatus] });
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    addTask(newTask);
    setNewTask({ title: '', assignee: '', priority: 'Medium', dueDate: '', status: 'Not Started' });
    setShowAddForm(false);
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':   return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Low':    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:       return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Completed':   return 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]';
      case 'In Progress': return 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.3)]';
      case 'Pending':     return 'bg-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.3)]';
      default:            return 'bg-gray-700 text-gray-300';
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/50 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200";

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Team Tasks</h1>
          </div>
          <p className="text-gray-400 text-sm">Orchestrate your agency operations and client deliveries.</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 ${
            showAddForm 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
          }`}
        >
          {showAddForm ? '✕ Close Form' : '+ Create Task'}
        </button>
      </div>

      {/* Add Task Form - Modern Card */}
      {showAddForm && (
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 mb-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-white mb-6">Create New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ml-1">Task Title</label>
              <input 
                className={inputCls} 
                placeholder="e.g. Design Logo for Ather Agency..."
                value={newTask.title} 
                onChange={e => setNewTask({ ...newTask, title: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ml-1">Assignee</label>
              <input 
                className={inputCls} 
                placeholder="Team member name"
                value={newTask.assignee} 
                onChange={e => setNewTask({ ...newTask, assignee: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ml-1">Due Date</label>
              <input 
                type="date" 
                className={inputCls}
                value={newTask.dueDate} 
                onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 ml-1">Priority</label>
              <select 
                className={inputCls} 
                value={newTask.priority} 
                onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button 
              onClick={handleAddTask} 
              className="flex-1 md:flex-none px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              🚀 Save Task
            </button>
            <button 
              onClick={() => setShowAddForm(false)} 
              className="flex-1 md:flex-none px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task List - Refined Cards */}
      <div className="space-y-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="group bg-gray-900/30 backdrop-blur-sm hover:bg-gray-800/40 border border-gray-800 hover:border-gray-700 p-5 rounded-2xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <button 
                  onClick={() => toggleTaskStatus(task.id, task.status)}
                  className={`mt-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    task.status === 'Completed' 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-600 hover:border-blue-500'
                  }`}
                >
                  {task.status === 'Completed' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
                
                <div>
                  <h3 className={`text-lg font-bold transition-all duration-300 ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="opacity-50">👤</span> {task.assignee || 'Unassigned'}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="opacity-50">📅</span> {task.dueDate || 'No date'}
                    </div>
                    <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-lg border ${getPriorityStyles(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-800">
                <button
                  onClick={() => toggleTaskStatus(task.id, task.status)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${getStatusStyles(task.status)}`}
                >
                  {task.status}
                </button>
                
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800/50 text-gray-500 hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 transition-all"
                  title="Delete Task"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-24 bg-gray-900/20 rounded-3xl border border-dashed border-gray-800">
            <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">📭</div>
            <h3 className="text-xl font-bold text-white mb-2">No tasks found</h3>
            <p className="text-gray-500 max-w-xs mx-auto">Looks like you're all caught up! High five for efficiency. 🚀</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="mt-8 text-blue-500 hover:text-blue-400 font-bold text-sm"
            >
              + Create your first task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}