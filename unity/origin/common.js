/**常用工具类与原型链改造封装 */

/**
 * 数组原型，获取最后一位数组
 */
Array.prototype.last = function (num = 1) {
    if (num == 1) {
        return this[this.length - 1];
    } else {
        return this.splice((this.length) - num, num);
    }
}



// // 对Date的扩展，将 Date 转化为指定格式的String
// // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// // 例子：
// // new Date().Format("yyyy-MM-dd.S") ==> 2006-07-02 08:09:04.423
// // new Date().Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// // new Date().Format("yyyy-MM-dd hh:mm:ss")      ==> 0000-00-00 00:00:00
Date.prototype.Format = function (fmt = 'yyyy-MM-dd hh:mm:ss') { //author: meizz
    const o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

