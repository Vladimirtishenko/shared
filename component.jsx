import React from 'react';
import { oneOfType, object } from 'prop-types';

const _typeof = (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') ?
                function a(obj) { return typeof obj; } :
                function b(obj) {
                    return (obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype) ?
                        'symbol' :
                        typeof obj;
                };

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { ...this.props };

        this.invalid = [];
    }

    shouldComponentUpdate(nextState) {
        return this.state !== nextState;
    }

    getErrorMessage() {
        const { errorMessages } = this.state,
                type = typeof errorMessages === 'undefined' ? 'undefined' : _typeof(errorMessages);

        if (type === 'string') {
            return errorMessages;
        } else if (type === 'object') {
            if (this.invalid.length > 0) {
                return errorMessages[this.invalid[0]];
            }
        }
        return true;
    }

    configure(component) {
        const { form: { attachToForm } } = this.context;
        attachToForm && attachToForm(component);
    }

    validate(value, ...args) {
        const includeRequired = args.length >= 1 && args[0] !== undefined ? args[0] : false,
              dryRun = args.length === 2 && args[1] !== undefined ? args[1] : false;

        this.invalid = [];

        const result = [],
              { validators } = this.state,
              { form: { getValidator } } = this.context;

        let valid = true;

        validators.map((validator, i) => {
            const obj = {};
            obj[i] = getValidator(validator, value, includeRequired);
            return result.push(obj);
        });

        result.map((item) => {
            return Object.keys(item).map((key) => {
                if (!item[key]) {
                    valid = false;
                    this.invalid.push(key);
                }
                return key;
            });
        });

        if (!dryRun) {
            this.setState({ isValid: valid }, () => {
                const { validatorListener, isValid } = this.state;
                validatorListener(isValid);
            });
        }
    }

    isValid() {
        const { isValid } = this.state;
        return isValid;
    }

    makeInvalid() {
        this.setState({ isValid: false });
    }

    makeValid() {
        this.setState({ isValid: true });
    }
}

Component.contextTypes = {
    form: oneOfType([object])
};

export default Component;
