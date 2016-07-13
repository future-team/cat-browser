'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Cookie = require('./Cookie');

var _Cookie2 = _interopRequireDefault(_Cookie);

var _UserAgent = require('./UserAgent');

var _UserAgent2 = _interopRequireDefault(_UserAgent);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

/**
 * 页面加载，判断是否存在cookie
 * 是，不做任何处理
 * 否，获取浏览器信息，
 * 自定义信息：模块名称,等发送给后端
 * 设置cookie，自定义过期时间
 * */

var Browser = (function () {
    function Browser() {
        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Browser);

        this.opts = Object.assign(_Options2['default'], opts);
        //cookie判断标示,值为yes
        this.cookieName = 'catBrowserName';
        this.cookieValue = 'catBrowserValue';
        //统计信息url
        this.url = opts.url || '//221.181.67.144/web-broker-service/api/js';
        this.cookie = new _Cookie2['default']();
        this.userAgent = new _UserAgent2['default']();
        this.loadEvent();
    }

    /**
     * 加载时执行
     * */

    Browser.prototype.loadEvent = function loadEvent() {
        var _this = this;
        window.onload = function () {
            _this.initHanlder();
        };
    };

    /**
     *
     * */

    Browser.prototype.initHanlder = function initHanlder() {
        var isFirst = this.isFirstVisit();
        isFirst && this.getUserInfo();
    };

    /**
     * 是否规定时间内第一次访问
     * */

    Browser.prototype.isFirstVisit = function isFirstVisit() {
        var Cookies = this.cookie,
            CName = this.cookieName,
            CValue = this.cookieValue;
        if (Cookies.get(CName) == CValue) {
            return false;
        } else {
            Cookies.set(CName, CValue, { expires: this.opts.ValidTime });
            return true;
        }
    };

    /**
     * 其他必要信息
     * */

    Browser.prototype.getData = function getData(browserName) {
        var data = {
            v: 1,
            t: +new Date(),
            msg: 'nothing',
            n: this.opts.moduleName,
            l: 'INFO',
            a: browserName,
            data: ''
        };
        return data;
    };

    /**
     * 获取浏览器信息
     * */

    Browser.prototype.getUserInfo = function getUserInfo() {
        var browserName = this.userAgent.getInfo();
        var data = this.getData(browserName);
        this.sendMsg(this.format(data));
    };

    /**
     * 发送信息
     * */

    Browser.prototype.sendMsg = function sendMsg(data) {
        //let [url,image] = [this.url, new Image(1, 1)];
        console.dir(data);
        //image.src = url+"?"+this.format(data );
    };

    /**
     * 格式化数据
     * */

    Browser.prototype.format = function format(data) {
        var arr = [];
        if (data && typeof data == 'object') {
            for (var _name in data) {
                arr.push(_name + '=' + data[_name]);
            }
        }
        return arr.join('&');
    };

    return Browser;
})();

exports['default'] = Browser;
;
module.exports = exports['default'];