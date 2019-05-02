import * as types from '../constant/warnings.const.js';

export const warningSetter = (error) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_WARNINGS,
            notification: { ...error }
        });
    };
};
