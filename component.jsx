import React from 'react'
import { object } from 'prop-types'

const _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

class Component extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {...this.props};

        this.invalid = [];
    }

    configure(component){
        const { form: { attachToForm } = {} } = this.context;

         attachToForm && attachToForm(component);
    }

    attach(component){
        const { form: { attachToForm } = {} } = this.context;

         attachToForm && attachToForm(component);
    }

    detach(component){
        const { form: { detachFromForm } = {} } = this.context;

         detachFromForm && detachFromForm(component);
    }

    getErrorMessage() {
        var errorMessages = this.state.errorMessages;

        var type = typeof errorMessages === 'undefined' ? 'undefined' : _typeof(errorMessages);

        if (type === 'string') {
            return errorMessages;
        } else if (type === 'object') {
            if (this.invalid.length > 0) {
                return errorMessages[this.invalid[0]];
            }
        }
        return true;
    }

    validate(value) {

        let includeRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false,
            dryRun = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        this.invalid = [];

        let result = [],
            valid = true;

        this.state.validators.map((validator, i) => {
            let obj = {};
            obj[i] = this.context.form.getValidator(validator, value, includeRequired);
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
                this.props.validatorListener(this.state.isValid);
            });
        }
    }

    isVali() {
        return this.state.isValid;
    }

    makeInvalid() {
        this.setState({ isValid: false });
    }

    makeValid() {
        this.setState({ isValid: true });
    }

    shouldComponentUpdate(nextState){
        return this.state !== nextState;
    }

}

Component.contextTypes = {
    form: object
};

export default Component;
