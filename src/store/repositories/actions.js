import api from "../../services/api";
import moment from "moment";

export const SET_REPOSITORY = "SET_REPOSITORY";
export function setRepository(payload) {
  return {
    type: SET_REPOSITORY,
    payload
  };
}

export function getRepository(repository) {
  return async dispatch => {
    try {
      const { data } = await api.get(`/repos/${repository}`);
      data.lastCommit = moment(data.pushed_at).fromNow();

      dispatch(setRepository(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export const REMOVE_REPOSITORY = "REMOVE_REPOSITORY";
export function removeRepository(payload) {
  return {
    type: REMOVE_REPOSITORY,
    payload
  };
}
