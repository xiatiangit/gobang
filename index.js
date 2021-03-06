var canvass = document.querySelector('.myCanvas');
var canvas = canvass;
// console.log(canvas);
var boxs = document.querySelector('.box');
var box = boxs;
// console.log(boxs);
var as = document.querySelector('.a');
var a = as;
// console.log(a);
var bs = document.querySelector('.b');
var b = bs;
// console.log(b);
var overs = document.querySelector('.over');
var over = overs;
// console.log(overs);
var texts = document.querySelector('.text2');
var text = texts;
// console.log(texts);
var btns = document.querySelector('.btn1');
var btn = btns;
// console.log(btns);
// 设置棋子颜色
// 默认为黑色
var color = 'black';
var ctx = canvas.getContext('2d');
// 点击白色先走按钮
a.onclick = function () {
    box.style.display = 'none';
    color = 'white';
};
// 点击黑色先走按钮
b.onclick = function () {
    box.style.display = 'none';
};
// 设置一个二维数组，存放棋盘数据
// 0表示未走，1表示黑棋走过，2表示白棋走过
var arr = new Array(15);
for (var i = 0; i < 15; i++) {
    arr[i] = new Array(15);
    for (var j = 0; j < 15; j++) {
        arr[i][j] = 0;
    }
}
// 绘制背景
ctx.fillStyle = 'pink';
ctx.fillRect(0, 0, 700, 700);
// 绘制棋盘
for (var i = 0; i < 16; i++) {
    // console.log(i);
    // 绘制横线
    ctx.moveTo(50, (i * 40) + 50);
    ctx.lineTo(650, (i * 40) + 50);
    ctx.stroke();
    // 绘制竖线
    ctx.moveTo((i * 40) + 50, 50);
    ctx.lineTo((i * 40) + 50, 650);
    ctx.stroke();
}
// 绘制棋子
function darw(x, y) {
    // console.log(x,y);
    var dx = x * 40 + 50;
    var dy = y * 40 + 50;
    // console.log(dx,dy);
    ctx.beginPath();
    // console.log(color);
    ctx.fillStyle = color;
    ctx.arc(dx, dy, 10, 0, 2 * Math.PI);
    ctx.fill();
    // 绘制棋子后切换玩家并把棋子数据记录起来
    if (color == 'black') {
        color = 'white';
        sto(1, x, y);
    }
    else {
        color = 'black';
        sto(2, x, y);
    }
    // 判断是否赢得胜利
    win(color, x, y);
}
// 点击棋盘后绘制棋子
canvas.onclick = function (e) {
    // console.log(e);
    var xx = e.offsetX;
    var yy = e.offsetY;
    // console.log(xx,yy);
    var px = xx - 50;
    var py = yy - 50;
    // console.log(px,py);
    var x = Math.round(px / 40);
    var y = Math.round(py / 40);
    // console.log(x,y);
    // 判断是否有棋子，如果有则提示下棋无效，如果没有则绘制棋子
    if (arr[x][y] != 0) {
        alert('该位置已有棋子');
    }
    else {
        darw(x, y);
    }
};
// 存储棋子数据
function sto(c, x, y) {
    // console.log(c,x,y);
    arr[x][y] = c;
    // console.log(arr); 
}
// 判断是否胜利
function win(c, x, y) {
    // console.log(c,x,y);
    var num = 0;
    if (c == 'black') {
        num = 2;
    }
    else if (c == 'white') {
        num = 1;
    }
    // console.log(num,x,y);
    // 判断左右方向
    var n1 = 0;
    // 判断上下方向
    var n2 = 0;
    // 判断从左上到右下方向
    var n3 = 0;
    // 判断从右上到左下方向
    var n4 = 0;
    // 先从点击位置向左寻找
    for (var i = x; i >= 0; i--) {
        // console.log(i);
        // console.log(num);
        if (arr[i][y] != num) {
            break;
        }
        n1++;
        // console.log(n1);
    }
    // 从点击位置向右寻找
    for (var i = x + 1; i < 15; i++) {
        // console.log(i);
        if (arr[i][y] != num) {
            break;
        }
        n1++;
        // console.log(n1);
    }
    // 从点击位置向上寻找
    for (var i = y; i >= 0; i--) {
        // console.log(i);
        if (arr[x][i] != num) {
            break;
        }
        n2++;
    }
    // 从点击位置向下寻找
    for (var i = y + 1; i < 15; i++) {
        if (arr[x][i] != num) {
            break;
        }
        n2++;
    }
    // 从点击位置向左上寻找
    for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
        // console.log(i,j);
        if (i < 0 || j < 0 || arr[i][j] != num) {
            break;
        }
        n3++;
    }
    // 从点击位置向右下寻找
    for (var i = x + 1, j = y + 1; i < 15, j < 15; i++, j++) {
        if (i >= 15 || j >= 15 || arr[i][j] != num) {
            break;
        }
        n3++;
    }
    // 从点击位置向右上寻找
    for (var i = x, j = y; i < 15, j >= 0; i++, j--) {
        if (i >= 15 || j < 0 || arr[i][j] != num) {
            break;
        }
        n4++;
    }
    // 从点击位置向左下寻找
    for (var i = x - 1, j = y + 1; i >= 0, j < 15; i--, j++) {
        if (i < 0 || j >= 15 || arr[i][j] != num) {
            break;
        }
        n4++;
    }
    // 判断
    if (n1 >= 5 || n2 >= 5 || n3 >= 5 || n4 >= 5) {
        if (num == 1) {
            over.style.display = 'inline';
            text.innerHTML = '黑色方胜';
        }
        else if (num == 2) {
            over.style.display = 'inline';
            text.innerHTML = '白色方胜';
        }
    }
}
// 点击重新开始按钮重新开始
btn.onclick = function () {
    // 后刷新页面
    window.location.reload();
};
