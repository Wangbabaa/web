// 不考虑滚动条的拖拽
let winMoveW = document.documentElement.clientWidth;
let winMoveH = document.documentElement.clientHeight;
function drag1(parentId, title) {
    let oParent = document.getElementById(parentId);
    let oTitle = oParent.querySelector(title);
    oTitle.onmousedown = function (ev) {
        let e = ev || Event;
        let disX = e.pageX - oParent.offsetLeft;
        let disY = e.pageY - oParent.offsetTop;
        document.onmousemove = function (ev) {
            let e1 = ev || Event;
            let left = e1.pageX - disX;
            left = Math.min(Math.max(left, 0), (winMoveW - oParent.offsetWidth));
            let top = e1.pageY - disY;
            top = Math.min(Math.max(top, 0), (winMoveH - oParent.offsetHeight));
            oParent.style.left = left + 'px';
            oParent.style.top = top + 'px';
        }
        document.onmouseup = function () {
            this.onmousemove = null;
            this.onmouseup = null;
        }
    }
}
// 滚动条的拖拽

function drag2(parentId, title) {
    let json = { scrollLeft: 0, screenTop: 0 };
    let oParent = document.getElementById(parentId);
    let oTitle = oParent.querySelector(title);
    oTitle.onmousedown = function (ev) {
        let e = ev || Event;
        let disX = e.pageX - oParent.offsetLeft;
        let disY = e.pageY - oParent.offsetTop;
        document.onmousemove = function (ev) {
            let e1 = ev || Event;
            let winMoveW = document.documentElement.clientWidth;
            let winMoveH = document.documentElement.clientHeight;
            let left = e1.pageX - disX;
            left = Math.min(Math.max(left, json.scrollLeft), (winMoveW + json.scrollLeft - oParent.offsetWidth));
            let top = e1.pageY - disY;
            top = Math.min(Math.max(top, json.screenTop), (winMoveH + json.screenTop - oParent.offsetHeight));
            oParent.style.left = left + 'px';
            oParent.style.top = top + 'px';
        }
        document.onmouseup = function () {
            this.onmousemove = null;
            this.onmouseup = null;
        }
    }
    document.onscroll = function () {
        let scrollLeft = document.documentElement.scrollLeft;
        let scrollTop = document.documentElement.scrollTop;
        oParent.style.left = (winMoveW - oParent.offsetWidth) / 2 + scrollLeft + 'px';
        oParent.style.left = (winMoveH - oParent.offsetHeight) / 2 + scrollTop + 'px';
        json = { scrollLeft: scrollLeft, screenTop: scrollTop };
        console.log(json);
    }
}
// 固定定位的拖拽
function drag3(parentId, title) {
    let json = { scrollLeft: 0, screenTop: 0 };
    let oParent = document.getElementById(parentId);
    let oTitle = oParent.querySelector(title);
    oTitle.onmousedown = function (ev) {
        let e = ev || Event;
        let disX = e.pageX - oParent.offsetLeft;
        let disY = e.pageY - oParent.offsetTop;
        document.onmousemove = function (ev) {
            let e1 = ev || Event;
            let winMoveW = document.documentElement.clientWidth;
            let winMoveH = document.documentElement.clientHeight;
            let left = e1.pageX - disX;
            left = Math.min(Math.max(left, 0), (winMoveW + json.scrollLeft - oParent.offsetWidth));
            let top = e1.pageY - disY;
            top = Math.min(Math.max(top, 0), (winMoveH + json.screenTop - oParent.offsetHeight));
            oParent.style.left = left + 'px';
            oParent.style.top = top + 'px';
        }
        document.onmouseup = function () {
            this.onmousemove = null;
            this.onmouseup = null;
        }
    }
}
// 框内拖拽
function drag4(winId, parentId, title) {
    let json = { scrollLeft: 0, screenTop: 0 };
    let oWin = document.getElementById(winId);
    let oParent = document.getElementById(parentId);
    // id只能用document进行获取；
    let oTitle = oParent.querySelector(title);
    let winW = oWin.offsetWidth;
    let winH = oWin.offsetHeight;
    oTitle.onmousedown = function (ev) {
        let e = ev || Event;
        let disX = e.pageX - oParent.offsetLeft;
        let disY = e.pageY - oParent.offsetTop;
        document.onmousemove = function (ev) {
            let e1 = ev || Event;
            let winMoveW = document.documentElement.clientWidth;
            let winMoveH = document.documentElement.clientHeight;
            let left = e1.pageX - disX;
            left = Math.min(Math.max(left, 0), (winW - oParent.offsetWidth));
            let top = e1.pageY - disY;
            top = Math.min(Math.max(top, 0), (winH - oParent.offsetHeight));
            oParent.style.left = left + 'px';
            oParent.style.top = top + 'px';
        }
        document.onmouseup = function () {
            this.onmousemove = null;
            this.onmouseup = null;
        }
    }
}
// 带虚框的拖拽
function drag5(parentId, title,position) {
    let oParent = document.getElementById(parentId);
    let oTitle = oParent.querySelector(title);
    let winW = document.documentElement.clientWidth;
    let winH = document.documentElement.clientHeight;
    oTitle.onmousedown = function (ev) {
        let e = ev || Event;
        let disX = e.pageX - oParent.offsetLeft;
        let disY = e.pageY - oParent.offsetTop;
        let oBox = document.createElement('div');
        
        oBox.style.left = oParent.offsetLeft + 'px';
        oBox.style.Top = oParent.offsetTop + 'px';
        oBox.style.position = position;
        console.log(oBox.style.Top);
        oBox.style.width = oParent.offsetWidth - 2 + 'px';
        oBox.style.height = oParent.offsetHeight - 2 + 'px';
        oBox.style.border = '2px dashed #999';
        document.body.appendChild(oBox);
        document.onmousemove = function (ev) {
            let e1 = ev || Event;
            let left = e1.pageX - disX;
            let top = e1.pageY - disY;
            left = Math.min(Math.max(left, 0), (winW - oParent.offsetWidth));

            top = Math.min(Math.max(top, 0), (winH - oParent.offsetHeight));
            oBox.style.left = left + 'px';
            oBox.style.top = top + 'px';
            return false;
        }
        document.onmouseup = function () {
            oParent.style.left = oBox.offsetLeft + 'px';
            oParent.style.top = oBox.offsetTop + 'px';
            document.body.removeChild(oBox);
            this.onmousemove = null;
            this.onmouseup = null;
        }
    }
}
