import Cookies from 'js-cookie';
export default class Cookie{
    constructor(){
    }
    set(name,value,opts){
        Cookies.set(name,value,opts);
    }
    get(name){
        Cookies.get(name);
    }
    remove(name){
        Cookies.remove(name);
    }
}