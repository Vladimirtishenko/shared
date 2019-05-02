export default function serializeJson(form, prot = false, canvas) {

    let data = {},
        arrays = [];
    if (typeof HTMLFormElement === "function" && form instanceof HTMLFormElement) {
        for (let i = 0; i < form.elements.length; i++) {
            if (
                (form.elements[i] instanceof HTMLInputElement && form.elements[i].type != 'file') ||
                form.elements[i] instanceof HTMLSelectElement ||
                form.elements[i] instanceof HTMLTextAreaElement
            ) {

                let {value, name, type, checked} = form.elements[i];

                if (type == 'radio' && !checked) {
                    continue;
                }
                if (type == 'checkbox') {
                    arrays.push({
                        name: name,
                        value: checked ? true : false
                    });
                    continue;
                }
                if (!name || !value) {
                    continue;
                }

                if (type == 'number') {
                    value = isNaN(value) ? value : +value;
                }

                arrays.push({
                    name: name,
                    value: value
                });
            }


        }
    } else if (Array.isArray(form)) {
        arrays = form;
    }

    data = arrays.reduce(function (r, item) {

        let s = r,
            arr = item.name.split('.');

        arr.forEach((n, k) => {
            let ck = n.replace(/\[[0-9]*\]$/, "");
            if (!s.hasOwnProperty(ck))
                s[ck] = (new RegExp("\[[0-9]*\]$").test(n)) ? [] : {};
            if (s[ck] instanceof Array) {
                let i = parseInt((n.match(new RegExp("([0-9]+)\]$")) || []).pop(), 10);
                i = isNaN(i) ? s[ck].length : i;
                s[ck][i] = s[ck][i] || {};
                if (k === arr.length - 1) {
                    if (prot && JSON.stringify({}) !== JSON.stringify(s[ck][i])) {

                        while (s[ck][i] !== undefined) {
                            let tmp = s[ck][i];
                            s[ck][i] = item.value;
                            item.value = tmp;
                            i++;
                        }
                    }
                    return s[ck][i] = item.value;
                } else {
                    return s = s[ck][i];
                }
            } else {
                return (k === arr.length - 1) ? s[ck] = item.value : s = s[ck];
            }
        });
        return r;
    }, {});

    return data;
}
