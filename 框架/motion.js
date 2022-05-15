// 匀速运动非透明度
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr]
    }
}


function moveTo1(obj, attr, iTarget, step) {
    clearInterval(obj.timer);
    let current = parseInt(getStyle(obj, attr));
    if (iTarget - current < 0) {
        step = -step;
        // 判断是往前走还是后走
    }
    // 一个物体运动的时候之前的运动没有结束， 再加一个运动后会产生冲突， 所以要清除定时器
    obj.timer = setInterval(function () {
        current = parseInt(getStyle(obj, attr));
        if (Math.abs(current - iTarget) < Math.abs(step)) {
            obj.style[attr] = iTarget + 'px';
            clearInterval(obj.timer);
        } else {
            obj.style[attr] = current + step + 'px';
        }
    }, 30)
}
// 匀速运动透明度
function moveTo2(obj, iTarget) {
    clearInterval(obj.timer)
    let step = 0.01;
    let curOpacity = getStyle(obj, 'opacity');

    if (iTarget - curOpacity < 0) {
        step = -step;
    } parseFloat()
    obj.timer = setInterval(function () {
        curOpacity = parseFloat(getStyle(obj, 'opacity'));
        if (Math.abs(iTarget - curOpacity) < Math.abs(step)) {
            obj.style.opacity = iTarget;
        }
        else {
            obj.style.opacity = curOpacity + step;

        }
    }, 30)

}
// 缓冲运动非透明度
function moveTo3(obj, attr, iTarget, speed, fun) {
    clearInterval(obj.timer);
    let current = parseInt(getStyle(obj, attr));
    // 一个物体运动的时候之前的运动没有结束， 再加一个运动后会产生冲突， 所以要清除定时器
    obj.timer = setInterval(function () {
        current = parseInt(getStyle(obj, attr));
        let step = (iTarget - current) / speed;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (current === iTarget) {
            clearInterval(obj.timer)
            if (fun) {
                fun();
                console.log(99);
            }
        } else {
            obj.style[attr] = current + step + 'px';
        }
    }, 30)
}
// 缓冲运动透明度
function moveTo4(obj, iTarget, speed, fun) {
    clearInterval(obj.timer);
    let current = parseInt(getStyle(obj, 'opacity') * 100);
    obj.timer = setInterval(function () {
        current = parseInt(getStyle(obj, 'opacity') * 100);
        let step = (iTarget - current) / speed;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (current === iTarget) {
            clearInterval(obj.timer)
            if (fun) {
                fun();
                console.log(99);
            }
        } else {
            obj.style.opacity = (current + step) / 100;
        }
    }, 30)
}
// 缓冲运动多重
// JSON  {'属性名':属性值,'成绩':[70,59,90]}
function moveTo5(obj, json, speed, fun) {
    clearInterval(obj.timer);
    let current;
    // 一个物体运动的时候之前的运动没有结束， 再加一个运动后会产生冲突， 所以要清除定时器
    obj.timer = setInterval(function () {
        let flag = true;
        for (let attr in json) {
            if (attr === 'opacity') {
                current = parseFloat(getStyle(obj, 'opacity'))*100;
                let step = (json.opacity*100 - current) / speed;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (current !== json.opacity) {
                    flag = false;
                    obj.style.opacity = ((current + step)/100).toFixed(2);
                }
            } else {
                current = parseInt(getStyle(obj, attr));
                let step = (json[attr] - current) / speed;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (current !== json[attr]) {
                    flag = false;
                    obj.style[attr] = current + step + 'px';
                }
            }
        }
        if (flag) {
            clearInterval(obj.timer)
            if (fun) {
                fun();
                console.log(99);
            }
        }
    }, 30)
}