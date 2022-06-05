import axios from "axios";
import {
  REPORTS_CREATE_FAIL,
  REPORTS_CREATE_REQUEST,
  REPORTS_CREATE_SUCCESS,
  REPORTS_DELETE_FAIL,
  REPORTS_DELETE_REQUEST,
  REPORTS_DELETE_SUCCESS,
  REPORTS_LIST_FAIL,
  REPORTS_LIST_REQUEST,
  REPORTS_LIST_SUCCESS,
  REPORTS_UPDATE_FAIL,
  REPORTS_UPDATE_REQUEST,
  REPORTS_UPDATE_SUCCESS,
} from "../constants/reportsConstants";

export const listReports = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/reports`, config);

    dispatch({
      type: REPORTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: REPORTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createReportAction =
  (
    ans1,
    ans2,
    ans3,
    desc,
    inctype,
    status,
    ques1,
    ques2,
    ques3,
    titledesc,
    uid,
    pic,
    header,
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: REPORTS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = await axios.post(
        `/api/reports/create`,
        {
          ans1,
          ans2,
          ans3,
          desc,
          inctype,
          status,
          ques1,
          ques2,
          ques3,
          titledesc,
          uid,
          pic,
          header,
        },

        config
      );

      dispatch({
        type: REPORTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: REPORTS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteReportAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORTS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/reports/${id}`, config);

    dispatch({
      type: REPORTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: REPORTS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateReportAction =
  (id, ans1, ans2, ans3, desc, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: REPORTS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/reports/${id}`,
        {
          id,
          ans1,
          ans2,
          ans3,
          desc,
          status,
        },
        config
      );

      dispatch({
        type: REPORTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: REPORTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
