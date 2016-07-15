export default class UserAgent {
    constructor() {

    }

    getInfo() {
        let browserInfo = this.getBrowserVersion();
        return browserInfo;
    }

    /**
     * 获得版本号 不需要
     * */
    getBrowserVersion() {
        let browser = this.getBrowserInfo()+'';
        //let versionInfo = parseInt((browser + "").replace(/[^0-9.]/ig, ""));
        console.log(browser);
        return browser;
    }

    /**
     * 获取浏览器类型
     * */
    getBrowserInfo() {
        var agent = navigator.userAgent.toLowerCase(),
         regStr_ie = /msie [\d.]+;/gi,
         regStr_ff = /\S+\sfirefox\/[\d.]+/gi,
         regStr_chrome = /chrome\/[\d.]+\s\S+/gi,
         regStr_saf = /\S+\ssafari\/[\d.]+/gi;
        let regStr_other = /\S+\s\S+$/gi;
        //IE
        if (agent.indexOf("msie") > 0) {
            return agent.match(regStr_ie);
        }else{
            return agent.match(regStr_other);
        }
       /* //firefox
        if (agent.indexOf("firefox") > 0) {
            return agent.match(regStr_ff);
        }
        //Chrome
        if (agent.indexOf("chrome") > 0) {
            return agent.match(regStr_chrome);
        }
        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            return agent.match(regStr_saf);
        }*/


    }
}
