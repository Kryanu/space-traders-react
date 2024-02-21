import { create } from 'zustand';

export const userDataStore = create((set) => ({
  handle: undefined,
  faction: undefined,
  token: undefined,
  changeToken: (newToken) => set(() => ({ token: newToken })),
  changeHandle: (newHandle) => set(() => ({ handle: newHandle })),
  changeFaction: (newFaction) => set(() => ({ faction: newFaction }))
}));
