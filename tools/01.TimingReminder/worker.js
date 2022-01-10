/*
    Author  :   阳光号总钻风
    Email   :   1599504800@qq.com
*/

// worker 中加载其他脚本
// importScripts('script1.js', 'script2.js');

console.log("已加载 worker.js");


class Timing {
    constructor() {
        this.timer = null;
        this.itv_timer = null;
    }

    setTimingEnd(totalTime, callback) {
        postMessage({ msg: "pauseMusic" });

        setTimeout(() => {
            console.log("倒计时结束：", new Date().toLocaleString());
            postMessage({ msg: "playMusic" });
        }, 1000 * totalTime);
    }

    setItvTimingEnd(totalTime, callback) {
        clearInterval(this.itv_timer);
        this.itv_timer = setInterval(() => {
            if (totalTime == 0) {
                clearInterval(this.itv_timer);
            } else {
                postMessage({
                    msg: "change_count",
                    count: --totalTime
                });
            }
        }, 1000);
    }

    async f1() {
        console.log('5秒后打印');
        await this.sleep(1000 * 5);
        console.log('5秒时间到');
    }

    /* duration 单位是毫秒 */
    sleep(duration = 1000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, duration);
        })
    }
}

var myTiming = new Timing();
// myTiming.f1();

onmessage = function (event) {
    // console.log("worker.js 接收到了来自 网页 的消息");
    // console.log(event.data);

    let data = event.data,
        func = data.func;
    if (func == "start_timing") {
        console.clear();
        console.log("倒计时开始：", new Date().toLocaleString());
        myTiming.setTimingEnd(data.totalTime);
        myTiming.setItvTimingEnd(data.totalTime);
    } else if (func == "xx") {
        console.log('xx')
    }
};


