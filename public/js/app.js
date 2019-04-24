'use strict';
import SendForm from "./controller/sendForm.js";

class App {
    constructor() {
        new SendForm();
    }
}

window.addEventListener('DOMContentLoaded', function(){
    new App();
});
