export const DATA_MODE = {
  mock: 'mock',
  live: 'live',
};

const STORAGE_KEY = 'space-traders-data-mode';

export const getDataMode = () => {
  if (typeof localStorage === 'undefined') return DATA_MODE.mock;
  return localStorage.getItem(STORAGE_KEY) || DATA_MODE.mock;
};

export const saveDataMode = (mode) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, mode);
  }
};

export const isMockMode = () => getDataMode() === DATA_MODE.mock;