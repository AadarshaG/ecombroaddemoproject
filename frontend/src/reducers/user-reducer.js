import { UserActionTypes } from "../actions/user-action";

const initialState = {
    user: [],
    loading: false,
    error: ''
};

 export const UserReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case UserActionTypes.FETCH_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UserActionTypes.FETCH_USERS_SUCCESS:
        return {
          loading: false,
          user: action.payload,
          error: "",
        };
      case UserActionTypes.FETCH_USERS_FAILURE:
        return {
          user: [],
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
