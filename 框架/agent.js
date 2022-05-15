//根据标签名称进行事件代理
function agent1(parentId, eventType, label, fun) {
    let oParent = document.getElementById(parentId);
    oParent['on' + eventType] = function (ev) {
        let e = ev || Event;
        e.stopPropagation();
        // 阻止 oParent 的冒泡
        let child = e.target || e.srcElement;
        let LABEL=label.toUpperCase()
        
        // !重要
        // child.nodeName是标签的名字 e.target事件所指向的目标
        while (child.nodeName!==LABEL && child.nodeName!==oParent.nodeName) {
            child=child.parentNode;
        }
        if (child.nodeName === LABEL) {
            fun.call(child);
            // 将方法绑定到child；
        }
    }
}
// 根据className进行事件代理
function agent2(parentId, eventType, clsName, fun) {
    let oParent = document.getElementById(parentId);
    oParent['on' + eventType] = function (ev) {
        let e = ev || Event;// !重要
        let child = e.target || e.srcElement;
        // child.nodeName是标签的名字 e.target事件所指向的目标
        while (child.className!==clsName && child.nodeName!==oParent.nodeName) {
            child=child.parentNode;
        }
        if (child.className === clsName) {
            fun.call(child);
            // 将方法绑定到child；
        }
    }
}

//清楚className
function clearCls(parentId,label,className){
    let oParent=document.getElementById(parentId);
    let aLabel=document.querySelectorAll(label);
    for (let i=0; i<aLabel.length; i++) {
        if(aLabel[i].className===className){
            aLabel[i].className='';
            break;
        }
    }
}
//根据classList进行时间代理
// 根据className进行事件代理
function agent3(parentId, eventType, clsName, fun) {
    let oParent = document.getElementById(parentId);
    oParent['on' + eventType] = function (ev) {
        let e = ev || Event;// !重要
        let child = e.target || e.srcElement;
        // 一直找到包含位置
        while (!child.classList.contains(clsName) && child.nodeName!==oParent.nodeName) {
            child=child.parentNode;
        }
        if (child.classList.contains(clsName)) {
            fun.call(child);
            // 将方法绑定到child；
        }
    }
}
// 对象加事件
function agent4(oParent, eventType, clsName, fun) {
    // let oParent = document.getElementById(parentId);
    oParent['on' + eventType] = function (ev) {
        let e = ev || Event;// !重要
        let child = e.target || e.srcElement;
        // 一直找到包含位置
        while (!child.classList.contains(clsName) && child.nodeName!==oParent.nodeName) {
            child=child.parentNode;
        }
        if (child.classList.contains(clsName)) {
            fun.call(child);
            // 将方法绑定到child；
        }
    }
}