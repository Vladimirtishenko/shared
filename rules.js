const _isExisty = value => value !== null && value !== undefined,

 _isEmpty = (value) => {
    if (value instanceof Array) {
        return value.length === 0;
    }
    return value === '' || !_isExisty(value);
},

 _isRadioEmpty = radio => (!radio.some(el => el.checked)),

 _isCheckboxEmpty = checkbox => (!checkbox.some(el => el.checked)),

 _isEmptyTrimed = (value) => {
    if (typeof value === 'string') {
        return value.trim() === '';
    }
    return true;
},

 validations = {
    matchRegexp: function matchRegexp(value, regexp) {
        const validationRegexp = regexp instanceof RegExp ? regexp : new RegExp(regexp);
        return _isEmpty(value) || validationRegexp.test(value);
    },

    isEmail: function isEmail(value) {
        return validations.matchRegexp(value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
    },

    isDate: function isDate(value) {
        return validations.matchRegexp(value, /^(?:(?:(?:0?[1-9]|1\d|2[0-8])\/(?:0?[1-9]|1[0-2]))\/(?:(?:1[6-9]|[2-9]\d)\d{2}))$|^(?:(?:(?:31\/0?[13578]|1[02])|(?:(?:29|30)\/(?:0?[1,3-9]|1[0-2])))\/(?:(?:1[6-9]|[2-9]\d)\d{2}))$|^(?:29\/0?2\/(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))))$/i);
    },

    isUrl: function isUrl(value) {
        return validations.matchRegexp(value, /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
    },

    isEmpty: function isEmpty(value) {
        return _isEmpty(value);
    },

    required: function required(value) {
        return !_isEmpty(value);
    },

    radioRequired: function required(value) {
        return !_isRadioEmpty(value);
    },

    checkboxRequired: function required(value) {
        return !_isCheckboxEmpty(value);
    },

    trim: function trim(value) {
        return !_isEmptyTrimed(value);
    },

    isNumber: function isNumber(value) {
        return validations.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i);
    },

    isFloat: function isFloat(value) {
        return validations.matchRegexp(value, /^(?:[1-9]\d*|0)?(?:\.\d+)?$/i);
    },

    isPositive: function isPositive(value) {
        if (_isExisty(value)) {
            return (validations.isNumber(value) || validations.isFloat(value)) && value >= 0;
        }
        return true;
    },

    maxNumber: function maxNumber(value, max) {
        return _isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10);
    },

    minNumber: function minNumber(value, min) {
        return _isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10);
    },

    maxFloat: function maxFloat(value, max) {
        return _isEmpty(value) || parseFloat(value) <= parseFloat(max);
    },

    minFloat: function minFloat(value, min) {
        return _isEmpty(value) || parseFloat(value) >= parseFloat(min);
    },

    isString: function isString(value) {
        return !_isEmpty(value) || typeof value === 'string' || value instanceof String;
    },
    minStringLength: function minStringLength(value, length) {
        return validations.isString(value) && value.length >= length;
    },
    maxStringLength: function maxStringLength(value, length) {
        return validations.isString(value) && value.length <= length;
    }
};

export default validations;
