import { create } from 'zustand';

const useImages = create((set) => ({
  images: {},
  isLoaded: false,
  setImages: (images) => set({ images }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));

export default useImages;