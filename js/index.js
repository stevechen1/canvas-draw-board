let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let lineWidth = 5;
let pencil = document.getElementById('pencil');
let brush = document.getElementById('brush');
let eraser = document.getElementById('eraser');

let red = document.getElementById('red');
let green = document.getElementById('green');
let blue = document.getElementById('blue');
let yellow = document.getElementById('yellow');

let thin = document.getElementById('thin');
let middle = document.getElementById('middle');
let thick = document.getElementById('thick');

let pageWidth = document.documentElement.clientWidth
let pageHeight = document.documentElement.clientHeight
ctx.width = pageWidth
ctx.height = pageHeight

let lastPoint = {
    'x': undefined,
    'y': undefined
}
let drawValue = false;

autoSetCanvasSize(canvas);
// listenToUser(canvas);



let eraserEnabled = false;
pencil.onclick = function () {
    toggle(this);
    pencil.classList.add('active');
    eraserEnabled = false;
    console.log('d:' + drawValue + '----e:' + eraserEnabled);
}
brush.onclick = function () {
    toggle(this);
    brush.classList.add('active');
    console.log('d:' + drawValue + '----e:' + eraserEnabled);

}
eraser.onclick = function () {
    toggle(this);
    eraser.classList.add('active');
    eraserEnabled = true;
    console.log('d:' + drawValue + '----e:' + eraserEnabled);
}
clear.onclick = function () {
    eraserEnabled = false;
    if (confirm('确认删除吗？')) {
        ctx.clearRect(0, 0, ctx.width, ctx.height)
    }
}

//颜色
red.onclick = function () {
    ctx.strokeStyle = 'red';
    toggle(this);
    red.classList.add('active');
}
green.onclick = function () {
    ctx.strokeStyle = 'green';
    toggle(this);
    green.classList.add('active');
}
blue.onclick = function () {
    ctx.strokeStyle = 'blue';
    toggle(this);
    blue.classList.add('active');
}
yellow.onclick = function () {
    ctx.strokeStyle = 'yellow';
    toggle(this);
    yellow.classList.add('active');
}
//线条宽度
thin.onclick = function () {
    ctx.lineWidth = 5;
    toggle(this);
    thin.classList.add('active');
}
middle.onclick = function () {
    ctx.lineWidth = 10;
    toggle(this);
    middle.classList.add('active');
    console.log('d:' + drawValue + '----e:' + eraserEnabled);
}
thick.onclick = function () {
    ctx.lineWidth = 15;
    toggle(this);
    thick.classList.add('active');
    console.log('d:' + drawValue + '----e:' + eraserEnabled);
}

//切换
function toggle(element) {
    let all = element.parentNode.children;
    for (let i = 0; i < all.length; i++) {
        all[i].classList.remove('active');
    }
}
//画笔函数
function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function drawCircle(x, y, radius) {
    if (!eraserEnabled) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    } else {
        console.log('擦除');
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
//画笔
canvas.onmousedown = function (e) {
    console.log('d:' + drawValue + '---e:' + eraserEnabled);
    let x = e.offsetX;
    let y = e.offsetY;
    lastPoint.x = x
    lastPoint.y = y
    drawCircle(x, y, 5 / 2);
    let a = true;
    drawValue = true
}
canvas.onmousemove = function (e) {
    if (!eraserEnabled) {
        console.log('d:' + drawValue + '---e:' + eraserEnabled);
        let x = e.offsetX;
        let y = e.offsetY;
        let newPoint = {
            'x': x,
            'y': y
        }
        if (drawValue) {
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        }
        lastPoint = newPoint
    } else {
        //橡皮擦实现
        console.log(ctx.lineWidth*20);
        ctx.clearRect(e.offsetX, e.offsetY, ctx.lineWidth*15, ctx.lineWidth*15);
    }
}
canvas.onmouseup = function () {
    drawValue = false
}

//保存
save.onclick = function () {
    let imgUrl = canvas.toDataURL('image/png');
    let saveA = document.createElement('a');
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = 'myCanvas.png';
    saveA.target = '_blank';
    saveA.click();
}