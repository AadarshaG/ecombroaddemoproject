
export const UserActionTypes = {
    FETCH_USERS_REQUEST: 'FETCH_USERS_REQUEST',
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE'
}

export const fetchUserRequest = () => {
  return (dispatch) => {
    return dispatch ({
        type: UserActionTypes.FETCH_USERS_REQUEST,
    })
  }
};

export const fetchUserSuccess = (user) => {
  return (dispatch) => {
    return dispatch ({
        type: UserActionTypes.FETCH_USERS_SUCCESS,
        payload: user,
    })
  }
};

export const fetchUserFaliure = (errorMsg) => {
  return (dispatch) => {
    return dispatch ({
        type: UserActionTypes.FETCH_USERS_FAILURE,
        payload: errorMsg,
    })
  }
};

