import React from 'react'
import { object, func, bool, node, number } from 'prop-types'

import ValidationRules from './rules.js';

class Form extends React.Component {

    static propTypes = {
        onSubmit: func.isRequired,
        instantValidate: bool,
        children: node,
        onError: func,
        debounceTime: number
    }

    constructor(props, context){
        super(props, context)

        this.childs = [];
        this.errors = [];

    }

    getChildContext() {
        return {
            form: {
                attachToForm: ::this.attachToForm,
                detachFromForm: ::this.detachFromForm,
                getValidator: ::this.getValidator
            }
        };
    }

    attachToForm(component) {

        if (this.childs.indexOf(component) === -1) {
            this.childs.push(component);
        }
    }

    detachFromForm(component) {
        let componentPos = this.childs.indexOf(component);
        if (componentPos !== -1) {
            this.childs = this.childs.slice(0, componentPos).concat(this.childs.slice(componentPos + 1));
        }
    }

    submit(event){

        if (event) {
            event.preventDefault();
        }
        let result = this.walk(this.childs);

        if (this.errors.length) {
            this.props.onError && this.props.onError(this.errors);
        }
        if (result) {
            this.props.onSubmit(event);
        }
        return result;
    }

    walk(children) {
        let result = true;

        if (Array.isArray(children)) {
            children.forEach((input) => {
                if (!this.checkInput(input)) {
                    result = false;
                }
                return input;
            });
        } else {
            result = this.walk([children]);
        }
        return result;
    }

    find(collection, fn) {
        for (let i = 0, l = collection.length; i < l; i++) {
            let item = collection[i];
            if (fn(item)) {
                return item;
            }
        }
        return null;
    }

    checkInput(input) {
        let result = true,
            validators = input.props.validators;

        if (validators && !this.validate(input, true)) {
            result = false;
        }

        return result;
    }

    validate(input, includeRequired) {

        let props = input.props,
            state = input.state,
            id = state.id,
            value = state.value,
            validators = props.validators,
            name = props.name,
            result = [],
            valid = true,
            validateResult = false,
            component = this.find(this.childs, (component) => {
                return component.state.id === id;
            });

        validators.map((validator) => {
            validateResult = this.getValidator(validator, value, includeRequired);
            result.push({ input: input, result: validateResult });

            component.validate(component.state.value, true);
            return validator;
        });

        result.map((item) => {
            if (!item.result) {
                valid = false;
                this.errors.push(item.input);
            }
            return item;
        });

        return valid;
    }

    getValidator(validator, value, includeRequired) {

        let result = true,
            name = validator;

        if (name !== 'required' || includeRequired) {
            let extra = void 0,
                splitIdx = validator.indexOf(':');

            if (splitIdx !== -1) {
                name = validator.substring(0, splitIdx);
                extra = validator.substring(splitIdx + 1);
            }
            result = ValidationRules[name](value, extra);
        }
        return result;
    };

    render(){

        return (<form onSubmit={::this.submit}>
                    {this.props.children}
               </form>)
    }
}

Form.childContextTypes = {
    form: object
};

export default Form;
