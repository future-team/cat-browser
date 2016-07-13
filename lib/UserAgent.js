"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserAgent = (function () {
    function UserAgent() {
        _classCallCheck(this, UserAgent);
    }

    UserAgent.prototype.getInfo = function getInfo() {
        var browserName = this.getBrowserVersion();
        return browserName;
    };

    /**
     * 获得版本号
     * */

    UserAgent.prototype.getBrowserVersion = function getBrowserVersion() {
        var browser = this.getBrowserInfo();
        var versionInfo = parseInt((browser + "").replace(/[^0-9.]/ig, ""));
        console.log(browser + versionInfo);
        return browser + versionInfo;
    };

    /**
     * 获取浏览器类型
     * */

    UserAgent.prototype.getBrowserInfo = function getBrowserInfo() {
        var agent = navigator.userAgent.toLowerCase();
        var regStr_ie = /msie [\d.]+;/gi;
        var regStr_ff = /firefox\/[\d.]+/gi;
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
    };

    return UserAgent;
})();

exports["default"] = UserAgent;
module.exports = exports["default"];