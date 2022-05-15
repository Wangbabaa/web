let json = { top: 0, down: 0, left: 0, right: 0 }
let oBox = document.querySelector('.box')
let oSection = oBox.querySelector('section')
let oAside = oSection.querySelector('aside')
let oImg2 = oBox.querySelector('img.img2')
let oImg3 = oBox.querySelector('img.img3')
oAside.onmousedown = function (e) {
    // console.log(e); 
    let target = e.target;
    if (target.nodeName==='SPAN') {return}
    let disX = e.pageX - oAside.offsetLeft
    let disY = e.pageY - oAside.offsetTop
    document.onmousemove = function (ev) {
        // oAside.style.left = ev.pageX - disX+'px';
        // oAside.style.top = ev.pageY - disY+'px';
        json.top = ev.pageY - disY
        json.left = ev.pageX - disX
        json.down = json.top + oAside.offsetHeight
        json.right = json.left + oAside.offsetWidth
        // console.log(json);
        procJson(json, true)
    }
    document.onmouseup = function (e) {
        this.onmousemove = null;
        this.onmouseup = null;
    }
}


agent1('drag', 'mousedown', 'span', function (e) {

    let clsName = this.className
    document.onmousemove = function (ev) {
        switch (clsName) {
            case 'left':
                json.left = ev.pageX - oSection.offsetLeft;
                break;
            case 'down':
                json.down = ev.pageY - oSection.offsetTop;
                break;
            case 'right':
                json.right = ev.pageX - oSection.offsetLeft;
                break;
            case 'leftUp':
                json.left = ev.pageX - oSection.offsetLeft;
                json.top = ev.pageY - oSection.offsetTop;
                break;
            case 'leftDown':
                json.left = ev.pageX - oSection.offsetLeft;
                json.down = ev.pageY - oSection.offsetTop;
                break;
            case 'rightDown':
                json.down = ev.pageY - oSection.offsetTop;
                json.right = ev.pageX - oSection.offsetLeft;
                break;
            case 'rightUp':
                json.top = ev.pageY - oSection.offsetTop;
                json.right = ev.pageX - oSection.offsetLeft;
                break;
            case 'Up':
                json.top = ev.pageY - oSection.offsetTop;
                break;
        }
        procJson(json, false)
    }
    document.onmouseup = function (e) {
        this.onmousemove = null;
        this.onmouseup = null;
    }

})
function procJson(json, isDrag) {
    if (isDrag) {
        json.left = Math.min(Math.max(0, json.left), oSection.offsetWidth - oAside.offsetWidth)
        json.top = Math.min(Math.max(0, json.top), oSection.offsetHeight - oAside.offsetHeight)
        json.down = json.top + oAside.offsetHeight
        json.right = json.left+oAside.offsetWidth 
       
    } else {
        // !这段代码相互依赖不能使用
        // if (json.down < json.top + 50)
        //     json.down = json.top + 50
        // if (json.down > oSection.offsetHeight)
        //     json.down = oSection.offsetHeight
        // if (json.top < 0) json.top = 0;
        // if (json.top > json.down - 50)
        //     json.top = json.down - 50
        // if (json.right < json.left + 50)
        //     json.right = json.left + 50;
        // if (json.right > oSection.offsetWidth)
        //     json.right = oSection.offsetWidth
        // if (json.left < 0) json.left = 0;
        // if (json.left > json.right - 50)
        //     json.left = json.right - 50
        json.down = Math.min(Math.max(json.down, 50),oSection.offsetHeight)
        json.top = Math.min(Math.max(json.top,0),json.down-50);
        json.right = Math.min(Math.max(json.right,50), oSection.offsetWidth)
        json.left = Math.min(Math.max(json.left,0),json.right-50);
        oAside.style.width = json.right - json.left + 'px';
        oAside.style.height = json.down - json.top + 'px';
    }





    oAside.style.left = json.left + 'px';
    oAside.style.top = json.top + 'px';
   
    console.log(json);
    oImg2.style.clip = `
    rect(${json.top}px, ${json.right}px, ${json.down}px,${json.left}px )
    `
    oImg3.style.clip = `
    rect(${json.top}px, ${json.right}px, ${json.down}px,${json.left}px )
    `
    oImg3.style.left = -json.left + 'px';
}
document.oncontextmenu = function () { return false; };