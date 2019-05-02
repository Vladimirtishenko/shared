import { SET_WARNINGS } from '../constant/warnings.const.js';

export const warningSetter = (error) => {
    return (dispatch) => {
        dispatch({
            type: SET_WARNINGS,
            warnings: { ...error }
        });
    };
};
