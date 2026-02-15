// 鼠标拖尾效果实现
// 创建一个数组用于存储拖尾点
const trail = [];
// 拖尾点的最大数量
const maxTrail = 20;

// 监听鼠标移动事件
window.addEventListener('mousemove', function(e) {
    // 获取鼠标当前位置
    const pos = { x: e.clientX, y: e.clientY };
    // 将当前位置添加到拖尾数组的开头
    trail.unshift(pos);
    // 如果拖尾数组长度超过最大数量，移除最后一个点
    if (trail.length > maxTrail) {
        trail.pop();
    }
});

// 创建拖尾点的DOM元素
const trailEls = [];
for (let i = 0; i < maxTrail; i++) {
    const el = document.createElement('div');
    // 设置拖尾点的样式
    el.style.position = 'fixed';
    el.style.width = '8px';
    el.style.height = '8px';
    el.style.borderRadius = '50%';
    el.style.background = 'rgba(0,0,0,0.2)';
    el.style.pointerEvents = 'none'; // 不影响鼠标事件
    el.style.zIndex = 9999;
    el.style.transition = 'background 0.2s';
    document.body.appendChild(el);
    trailEls.push(el);
}

// 渲染拖尾效果
function renderTrail() {
    // 遍历拖尾点数组
    for (let i = 0; i < trailEls.length; i++) {
        if (trail[i]) {
            // 设置每个拖尾点的位置
            trailEls[i].style.left = trail[i].x - 4 + 'px'; // 居中
            trailEls[i].style.top = trail[i].y - 4 + 'px';
            // 根据拖尾点的顺序设置透明度，实现渐变效果
            trailEls[i].style.opacity = (1 - i / maxTrail).toString();
        } else {
            // 如果没有对应的拖尾点，隐藏该元素
            trailEls[i].style.opacity = '0';
        }
    }
    // 使用requestAnimationFrame实现动画
    requestAnimationFrame(renderTrail);
}

// 启动渲染
renderTrail();
