import { create } from 'zustand';
import {produce} from "immer";

export const gameDataStore = create((set) => ({
  gameState: undefined,
  updateGame: (newState) => set(produce((state) => { state.gameState = newState; })),
}));
