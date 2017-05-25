/**
 * Created by zoulifeng on 2017/5/25.
 */
window.onload = function () {

    waterfull('main', 'picBox', 15);

}

//模拟数据
var data = [
    {src: 'images/0.jpg'},
    {src: 'images/1.jpg'},
    {src: 'images/2.jpg'},
    {src: 'images/3.jpg'},
    {src: 'images/4.jpg'},
    {src: 'images/5.jpg'},
    {src: 'images/6.jpg'},
    {src: 'images/7.jpg'},
    {src: 'images/8.jpg'},
    {src: 'images/9.jpg'},
    {src: 'images/10.jpg'},
    {src: 'images/11.jpg'},
    {src: 'images/12.jpg'},
    {src: 'images/13.jpg'},
    {src: 'images/14.jpg'},
]


//列排序
function waterfull(parentID, classNa, paddingR) {

    $main = document.getElementById(parentID);

    //获取所有的img
    var oElement = document.querySelectorAll('.' + classNa);
    //获取一行多少列
    var col = Math.floor(document.documentElement.clientWidth / oElement[0].clientWidth) >= 4?Math.floor(document.documentElement.clientWidth / oElement[0].clientWidth):4;

    //获取列的宽
    var cloW = oElement[0].clientWidth;
    //设置容器的宽
    $main.style.width = col * oElement[0].clientWidth + paddingR + 'px';

    //存放每一列高度值
    var hArr = [];
    //存放每一列最小值
    var minH;
    //存放最小值的下标
    var indexH;

    for (var i = 0; i < oElement.length; i++) {
        if (i < col) {//如果是第一行
            hArr.push(oElement[i].clientHeight);//存放第一行的高度
            oElement[i].style.cssText = 'position:absolute;left:0' + i * cloW + 'px;top:0px';//第一行布局
        } else {
            minH = Math.min.apply(this, hArr);//获取列表最小高度
            indexH = hArr.indexOf(minH);//获取列表最小高度第一次出现的位置
            //布局
            oElement[i].style.cssText = 'position:absolute;left:' + indexH * cloW + 'px;top:' + minH + 'px'
            //改变之前最小高度的值为当前数据高度+原高度
            hArr[indexH] += oElement[i].clientHeight;
        }
    }
    //判断是佛满足加载数据条件
    isApend();
}

window.onresize = function () {

    // 减少重复调用次数
    if (t) {
        clearTimeout(t)
    }
    var t = setTimeout(function () {
        waterfull('main', 'picBox', 15);

    }, 200)

}

window.onscroll = function () {
    //
    clearTimeout(sTimer);

    var sTimer = setTimeout(function () {
        isApend();
    },100)

}
//判断是否加载
function isApend() {
    var allPic = document.querySelectorAll('.picBox');//获取所有的单元
    var lastH = allPic[allPic.length - 1].offsetTop; //获取最后的单元的top值
    var winH = document.documentElement.clientHeight || document.body.clientHeight  //获取文档body的高度
    var scrollT = document.body.scrollTop;//获取文档滚动的距离
    if (lastH < (scrollT + winH - Math.floor(allPic[allPic.length - 1].clientHeight / 2))) {
        append();//加载
    }
}


//模拟加载数据
function append() {
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement('div');
        div.className = 'picBox';

        div.innerHTML = `
        <div class="pic">
            <img src=${data[i].src} alt="">
        </div>
       `;
        document.getElementById('main').appendChild(div);
    }
    //重新排序布局
    waterfull('main', 'picBox', 15);
}