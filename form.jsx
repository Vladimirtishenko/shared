import React from 'react';
import {
 object, func, node, oneOfType
} from 'prop-types';

import ValidationRules from './rules.js';

class Form extends React.Component {
    static propTypes = {
        onSubmit: func.isRequired,
        children: node.isRequired,
        onError: func
    }

    static defaultProps = {
        onError: () => {}
    }

    static find(collection, fn) {
        for (let i = 0, l = collection.length; i < l; i++) {
            const item = collection[i];
            if (fn(item)) {
                return item;
            }
        }
        return null;
    }

    static getValidator(validator, value, includeRequired) {
        let result = true,
            name = validator;

        if (name !== 'required' || includeRequired) {
            let extra;
            const splitIdx = validator.indexOf(':');

            if (splitIdx !== -1) {
                name = validator.substring(0, splitIdx);
                extra = validator.substring(splitIdx + 1);
            }

            result = ValidationRules[name](value, extra);
        }

        return result;
    }

    constructor(props, context) {
        super(props, context);

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

    validate(input, includeRequired) {
        const { props } = input,
            { state } = input,
            { id } = state,
            { value } = state,
            { validators } = props,
            result = [],
            component = Form.find(this.childs, (c) => {
                return c.state.id === id;
            });

        let valid = true,
            validateResult = false;

        validators.map((validator) => {
            validateResult = Form.getValidator(validator, value, includeRequired);
            result.push({ input, result: validateResult });

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

    attachToForm(component) {
        if (this.childs.indexOf(component) === -1) {
            this.childs.push(component);
        }
    }

    detachFromForm(component) {
        const componentPos = this.childs.indexOf(component);
        if (componentPos !== -1) {
            this.childs = this.childs.slice(0, componentPos)
                                     .concat(this.childs.slice(componentPos + 1));
        }
    }

    submit(event) {
        if (event) {
            event.preventDefault();
        }
        const result = this.walk(this.childs),
            { onError, onSubmit } = this.props;

        if (this.errors.length) {
            onError && onError(this.errors);
        }
        if (result) {
            onSubmit(event);
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

    checkInput(input) {
        let result = true;
        const { validators } = input.props;

        if (validators && !this.validate(input, true)) {
            result = false;
        }

        return result;
    }

    render() {
        const { children } = this.props;
        return (
            <form onSubmit={::this.submit}>
                {children}
            </form>
        );
    }
}

Form.childContextTypes = {
    form: oneOfType([object])
};

export default Form;
