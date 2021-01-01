import * as api from '../api/index'
import { ADD_MAIL } from '../constants/actionTypes';

export const addMail = (postData) => async (dispatch) => {
    try {
        const { data } = await api.addMail(postData);
        dispatch({ type: ADD_MAIL, payload: data });
    }
    catch (error) {
        console.log(error.message);
    }
}