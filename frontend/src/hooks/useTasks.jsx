import { create } from 'zustand';

const useTasks = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [{...task, id: state.tasks.length + 1}, ...state.tasks] })),
  removeTask: (id) => set((state) => ({ tasks: state.tasks.filter(tsk => tsk.id !== id) })),
}));

export default useTasks;