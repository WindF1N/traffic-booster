import { create } from 'zustand';

const useLocalBalance = create((set) => ({
  localBalance: 0,
  setLocalBalance: (localBalance) => set({ localBalance }),
}));

export default useLocalBalance;