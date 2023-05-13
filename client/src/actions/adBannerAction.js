import axios from "axios";

import {
    CREATE_ADBANNER_REQUEST,
    CREATE_ADBANNER_SUCCESS,
    CREATE_ADBANNER_FAIL,
    GET_BANNERS_REQUEST,
    GET_BANNERS_SUCCESS,
    GET_BANNERS_FAIL,
    CLEAR_ERRORS
} from "../constants/adBannerConstant.js"


// Create adBanner

export const createAdBanner = (bannerData) => async(dispatch) => {
    try {
      dispatch({ type: CREATE_ADBANNER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post('/api/v1/create/adBanner', bannerData, config);
  
      if(data.data !== ""){
        dispatch({ type: CREATE_ADBANNER_SUCCESS, payload: data });
      } else {
        dispatch({
          type: CREATE_ADBANNER_FAIL,
          payload: "Failed to create ad banner",
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_ADBANNER_FAIL,
        payload: error.response.data.message,
      });
    }
}

//get banners
export const getAllBanners = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BANNERS_REQUEST });

    const { data } = await axios.get("/api/v1/get/adBanner");

    dispatch({
      type: GET_BANNERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BANNERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}