import { create } from 'zustand';
import { produce } from 'immer';

export const gameDataStore = create((set) => ({
  gameState: undefined,
  agent: undefined,
  location: undefined,
  ships: undefined,
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
  updateLocation: (newState) =>
    set(
      produce((state) => {
        state.location = newState;
      })
    ),
  updateShips: (newState) =>
    set(
      produce((state) => {
        state.ships = newState;
      })
    ),
}));
