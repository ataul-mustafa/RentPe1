import {
    CREATE_ADBANNER_REQUEST,
    CREATE_ADBANNER_SUCCESS,
    CREATE_ADBANNER_FAIL,
    CREATE_ADBANNER_RESET,
    CLEAR_ERRORS,
    GET_BANNERS_REQUEST,
    GET_BANNERS_SUCCESS,
    GET_BANNERS_FAIL
} from "../constants/adBannerConstant"

export const adBannerReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case CREATE_ADBANNER_REQUEST:
        case GET_BANNERS_REQUEST:
            return {
                loading: true,
            }

        case CREATE_ADBANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                success: action.payload.success,
            }

        case GET_BANNERS_SUCCESS:
            return {
                ...state,
                loading: false,
                banners: action.payload.banner,
                success: action.payload.success,
                count: action.payload.productsCount,
            }

        case CREATE_ADBANNER_FAIL:
        case GET_BANNERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case CREATE_ADBANNER_RESET:
            return {
                ...state,
                success: false,
            };

        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}