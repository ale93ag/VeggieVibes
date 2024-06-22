// src/store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  appetizers: [],
  breakfast: [],
  dessert: [],
  mainCourse: [],
  sideDish: [],
  snack: [],
  cuisine: [], // Nuova variabile di stato per le ricette di tipo cuisine
  setAppetizers: (data) => set({ appetizers: data }),
  setBreakfast: (data) => set({ breakfast: data }),
  setDessert: (data) => set({ dessert: data }),
  setMainCourse: (data) => set({ mainCourse: data }),
  setSideDish: (data) => set({ sideDish: data }),
  setSnack: (data) => set({ snack: data }),
  setCuisine: (data) => set({ cuisine: data }), // Metodo setter per le ricette di tipo cuisine
}));

export default useStore;

