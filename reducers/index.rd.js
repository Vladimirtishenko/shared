import * as types from '../constant/warnings.const.js';

const initialState = {
    notification: null
};

export default function category(state = initialState, action) {
    switch (action.type) {
        case types.SET_WARNINGS:
            return {
                ...state,
                notification: action.notification
            };

        default:
            const notification = _.indexOf(_.keys(action), 'notification');

            if (notification !== -1) {
                return {
                    ...state,
                    notification: action.notification
                };
            }
            return state;
    }
}
