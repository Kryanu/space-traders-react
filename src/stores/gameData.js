import { create } from 'zustand';
import { produce } from 'immer';

export const gameDataStore = create((set) => ({
  gameState: undefined,
  agent: undefined,
  updateGame: (newState) =>
    set(
      produce((state) => {
        state.gameState = newState;
      })
    ),
  updateAgent: (newState) =>
    set(
      produce((state) => {
        state.agent = newState;
      })
    ),
}));
