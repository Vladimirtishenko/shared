import * as types from '../constant/warnings.const.js';

const initialState = {
    warnings: null
};

export default function category(state = initialState, action) {
    switch (action.type) {
        case types.SET_WARNINGS:
            return {
                ...state,
                warnings: action.warnings
            };

        default:
            const warnings = _.indexOf(_.keys(action), 'warnings');

            if (warnings !== -1) {
                return {
                    ...state,
                    warnings: action.warnings
                };
            }
            return state;
    }
}
