import { create } from 'zustand';

export const userDataStore = create((set) => ({
  handle: undefined,
  faction: undefined,
  changeHandle: (newHandle) => set(() => ({ handle: newHandle })),
  changeFaction: (newFaction) => set(() => ({ faction: newFaction }))
}));
