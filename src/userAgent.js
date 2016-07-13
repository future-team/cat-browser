export default class UserAgent {
    constructor() {

    }

    getInfo() {
        let browserName = this.getBrowserVersion();
        return browserName;
    }

    /**
     * 获得版本号
     * */
    getBrowserVersion() {
        let browser = this.getBrowserInfo();
        let versionInfo = parseInt((browser + "").replace(/[^0-9.]/ig, ""));
        console.log(browser + versionInfo);
        return browser + versionInfo;
    }

    /**
     * 获取浏览器类型
     * */
    getBrowserInfo() {
        var agent = navigator.userAgent.toLowerCase();
        var regStr_ie = /msie [\d.]+;/gi;
        var regStr_ff = /firefox\/[\d.]+/gi
        var regStr_chrome = /chrome\/[\d.]+/gi;
        var regStr_saf = /safari\/[\d.]+/gi;
        //IE
        if (agent.indexOf("msie") > 0) {
            return agent.match(regStr_ie);
        }
        //firefox
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
        }

    }
}
