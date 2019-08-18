import { post, getAPI } from "./mainAction";

export const callLogin = (postData, req) => post(`login`, postData, req);

export const callGetGameList = (postData, req) =>
  post(`game_list`, postData, req);

export const callCityList = () => getAPI(`getCity`);
