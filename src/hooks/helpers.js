import { API } from '../api/service';

export const retrieveWaypoints = async (system, params) => {
  return await API.system.listWaypoints(system, params);
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retrieveMapWaypoints = async (
  token,
  system,
  traits,
  updateWaypoints,
) => {
  const { data, meta } = await API.system.listWaypoints(token, system, {
    limit: 20,
    page: 1,
    traits,
  });
  let waypoints = [...data];
  const pages = Math.ceil(meta.total / 20);
  if (pages < 2) {
    updateWaypoints(waypoints);
    return;
  }
  for (let i = 2; i <= pages; i++) {
    const waypointRes = await API.system.listWaypoints(token, system, {
      limit: 20,
      page: i,
    });
    waypoints = [...waypoints, ...waypointRes.data];
    delay(300);
  }
  updateWaypoints(waypoints);
};
