import axios from 'axios';
import {
  USER_ALERT,
  USER_FIND_ONE,
  USER_ADD,
  USER_LOADING,
  USER_FIND_ALL,
  USER_SEARCH,
  USER_CLEAR,
} from './userTypes';

export const userFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/api/user/${id}`);

    dispatch({ type: USER_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const userFindAll = () => async dispatch => {
  try {
    dispatch({ type: USER_LOADING });

    const response = await axios.get(`/api/user`);

    const { data: docs } = response;

    dispatch({
      type: USER_FIND_ALL,
      payload: {
        docs,
      },
    });
  } catch (err) {
    dispatch({
      type: USER_ALERT,
      payload: {
        header: 'Error',
        text: 'There was an error loading all users',
        type: 'danger',
      },
    });
  }
};

export const userSearch = values => async dispatch => {
  try {
    let loadTimeOut;

    loadTimeOut = setTimeout(() => {
      dispatch({ type: USER_LOADING });
    }, 2000);

    const { filter, query } = values;

    const response = await axios.get(
      `/api/user/search?q=${query || ''}&f=${filter}`,
    );

    clearTimeout(loadTimeOut);

    dispatch({
      type: USER_SEARCH,
      payload: { docs: response.data, query, filter },
    });
  } catch (e) {
    console.log(e);
  }
};

export const userAdd = (input, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/user', input);

    dispatch({ type: USER_ADD, payload: response.data });

    callback();
  } catch (e) {
    dispatch({
      type: USER_ALERT,
      payload: { type: 'error', text: e.response.data.errorMessage },
    });
  }
};

export const userClear = () => async dispatch => {
  try {
    dispatch({ type: USER_CLEAR });
  } catch (err) {
    console.log(err);
  }
};
