import { system } from './system';
import { fleet } from './fleet';
import { agent } from './agent';
import { isMockMode } from './mode';
import { mockAPI } from '../mocks';

const buildModeAwareMethods = (liveApi, mockApi) =>
  Object.fromEntries(
    Object.entries(liveApi).map(([name, liveMethod]) => [
      name,
      (...args) => (isMockMode() ? mockApi[name](...args) : liveMethod(...args)),
    ])
  );

export const API = {
  system: buildModeAwareMethods(system, mockAPI.system),
  fleet: buildModeAwareMethods(fleet, mockAPI.fleet),
  agent: buildModeAwareMethods(agent, mockAPI.agent),
};
