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
        //兼容低版本浏览器，不用Object.assign，
        //this.opts = Object.assign(defaultOpts,opts);
        this.moduleName = opts.moduleName || defaultOpts.moduleName;
        this.expiresTime = opts.expiresTime || defaultOpts.expiresTime;
        //cookie判断标示,值为yes
        this.cookieName = 'catBrowserName';
        this.cookieValue = 'catBrowserValue';
        //统计信息url
        this.url ='//221.181.67.144/web-broker-service/api/js';
        this.cookie = new Cookie();
        this.userAgent = new UserAgent();
        this.initHanlder();
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
            CName = this.cookieName,
            CValue = this.cookieValue;
        if (Cookies.get(CName) == CValue) {
            return false;
        } else {
            Cookies.set(CName, CValue,{expires:this.expiresTime});
            return true
        }
    }
    /**
     * 其他必要信息
     * */
    getData(browserName) {
        //对应catjs报警接口字段http://cat.dp/cat/r/home?op=view&docName=browserMonitor
        let data = {
            v: 1,
            t: +new Date(),
            msg: 'browserUseRate',
            n: this.moduleName,
            l: 'INFO',
            a: browserName,
            data: browserName
        };
        return data;
    }
    /**
     * 获取浏览器信息
     * */
    getUserInfo(){
        let browserName = this.userAgent.getInfo();
        let data = this.getData(browserName);
        this.sendMsg(this.format(data));
    }
    /**
     * 发送信息
     * */
    sendMsg(data){
        let [url,image] = [this.url, new Image(1, 1)];
        console.dir(data);
        image.src = url+"?"+ data;
    }
    /**
     * 格式化数据
     * */
    format(data){
        let arr = [];
        if(data && typeof(data) =='object' ){
            for(let name in data){
                arr.push(`${name}=${data[name]}`);
            }
        }
        return arr.join('&');
    }
};
