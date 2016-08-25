import Cookie from './Cookie';
import UserAgent from './UserAgent';
import defaultOpts from './Options';
/**
 * 页面加载，判断是否存在cookie
 * 是，不做任何处理
 * 否，获取浏览器信息，
 * 自定义信息：模块名称,等发送给后端
 * 设置cookie，自定义过期时间
 * */
export default class Browser {
    constructor(opts = {}) {
        //兼容低版本浏览器，不用Object.assign
        this.opts = this.extendObj(defaultOpts, opts);
        this.isOnlyDp = this.opts.isOnlyDp;
        this.cookie = new Cookie();
        this.userAgent = new UserAgent();
        //是否监控
        this.isCat = true;
        //是否必须dp环境下，再次判断是否监控
        this.isOnlyDp && this.isDpEnv();
        this.isCat && this.initHanlder();
    }

    /**
     * 初始化方法
     * */
    initHanlder() {
        let isFirst = this.isFirstVisit();
        isFirst && this.getUserInfo();
    }

    /**
     * 是否规定时间内第一次访问
     * */
    isFirstVisit() {
        let Cookies = this.cookie,
            CName = this.opts.cookieName,
            CValue = this.opts.cookieValue;
        if (Cookies.get(CName) == CValue) {
            return false;
        } else {
            Cookies.set(CName, CValue, {expires: this.opts.expiresTime});
            return true
        }
    }

    /**
     * 其他必要信息
     * */
    getData(browserName) {
        /**
         * 对应catjs报警接口
         * 字段文档http://cat.dp/cat/r/home?op=view&docName=browserMonitor
         */
        let data = {
            v: 1,
            t: +new Date(),
            msg: 'browserUseRate',
            n: this.opts.moduleName,
            l: 'INFO',
            a: browserName,
            data: this.getHost()
        };
        return data;
    }

    /**
     * 获取浏览器信息
     * */
    getUserInfo() {
        let browserName = this.userAgent.getInfo();
        let data = this.getData(browserName);
        this.sendMsg(this.format(data));
    }

    /**
     * 发送信息
     * */
    sendMsg(data) {
        let [url,image] = [this.opts.url, new Image(1, 1)];
        //console.dir(data);
        image.src = url + "?" + data;
    }

    /**
     * 格式化数据
     * */
    format(data) {
        let arr = [];
        if (data && typeof(data) == 'object') {
            for (let name in data) {
                arr.push(`${name}=${data[name]}`);
            }
        }
        return arr.join('&');
    }

    /**
     * 原生实现extend
     * */
    extendObj(target, source) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        return target;
    }
    /**
     * 获取当前环境页面的url
     * */
    getHost(){
        let url = location.href || '';
        return url;
    }
    /**
     * 获取当前环境。
     * 商家后台或者阿波罗不同环境
     * */
    isDpEnv() {
        let dpEnv = this.dpEnv(),
            url = location.hostname;
        this.isCat = url.indexOf(dpEnv)>-1 ? true : false;
    }
    /**
     * 当前商家和阿波罗对应的hostname
     * */
    dpEnv() {
        let url = ['e.51ping.com', 'ppe.e.dianping.com', 'e.dianping.com', 'apollo.51ping.com', 'ppea.dper.com', 'a.dper.com'];
        return url.join('');
    }

};
