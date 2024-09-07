import { create } from 'zustand';

const useLoadedPages = create((set) => ({
  loadedPages: {},
  addLoadedPage: (loadedPage) => set((state) => ({ loadedPages: {...state.loadedPages, [loadedPage]: false} })),
}));

export default useLoadedPages;