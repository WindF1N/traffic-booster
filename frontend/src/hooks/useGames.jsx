import { create } from 'zustand';

const useGames = create((set) => ({
  games: [],
  setGames: (games) => set({ games }),
}));

export default useGames;