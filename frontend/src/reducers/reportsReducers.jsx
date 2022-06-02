import {
  REPORTS_UPDATE_REQUEST,
  REPORTS_UPDATE_SUCCESS,
  REPORTS_UPDATE_FAIL,
  REPORTS_CREATE_FAIL,
  REPORTS_CREATE_REQUEST,
  REPORTS_CREATE_SUCCESS,
  REPORTS_DELETE_FAIL,
  REPORTS_DELETE_REQUEST,
  REPORTS_DELETE_SUCCESS,
  REPORTS_LIST_FAIL,
  REPORTS_LIST_REQUEST,
  REPORTS_LIST_SUCCESS,
} from "../constants/reportsConstants";

export const reportListReducer = (state = { reports: [] }, action) => {
  switch (action.type) {
    case REPORTS_LIST_REQUEST:
      return { loading: true };
    case REPORTS_LIST_SUCCESS:
      return { loading: false, reports: action.payload };
    case REPORTS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const reportCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORTS_CREATE_REQUEST:
      return { loading: true };
    case REPORTS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case REPORTS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const reportDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORTS_DELETE_REQUEST:
      return { loading: true };
    case REPORTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case REPORTS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const reportUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORTS_UPDATE_REQUEST:
      return { loading: true };
    case REPORTS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case REPORTS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
