import api from "../helper/api.js"
import {itemTemplate} from '../view/item.view.js'

class SendForm {
    static defaultProps = {
        btn: 'form__btn',
        input: 'form__input',
        form: 'form',
        wrap: 'items'
      }

    constructor(props = {}){
        this.props = {...SendForm.defaultProps, ...props};
        this.init();
    }

    init(){
        let form = _$('.' + this.props.form);
        $app.h('event').flyEvent('add', ['click'], [form], ::this.sendForm);
    }

    async sendForm(event){
        event.preventDefault();
        
        let inputEl = _$('.' + this.props.input),
            url = inputEl.value;
        
        if(url.length === 0){
            return false;   
        }

        try {
            inputEl.classList.remove('form__input--error');
            let data = await api.__post({ path: `/data` , host: 'http://localhost:', port: 2222}, {url}) || {},
                html = this.makeView(data);
            this.renderItem(html);
        } catch(err){
            if (err) {
                inputEl.classList.add('form__input--error');
            }
        }
    }

    renderItem(html){
        let items = _$('.' + this.props.wrap);        
        items.innerHTML += html;
    }

    makeView(data) {
        return itemTemplate(data);
    }
}
export default SendForm;