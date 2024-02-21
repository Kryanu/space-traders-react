import { create } from 'zustand';

export const userDataStore = create((set) => ({
  handle: undefined,
  changeHandle: (newHandle) => set(() => ({ handle: newHandle })),
}));
