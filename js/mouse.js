function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

document.addEventListener('mousemove', throttle(function(event) {
    createtrail(event.pageX, event.pageY);
}, 50)); // 50毫秒，即0.05秒

function createtrail(x, y) {
    try {
        const trail = document.createElement('div');
        trail.classList.add('trail');
        // 随机大小 12~32px
        const size = Math.random() * 20 + 12;
        trail.style.width = `${size}px`;
        trail.style.height = `${size}px`;
        // 随机颜色（HSL色相）
        const hue = Math.floor(Math.random() * 360);
        const color = `hsl(${hue}, 90%, 60%)`;
        trail.style.background = `radial-gradient(circle at 30% 30%, ${color}, #fff0 80%)`;
        trail.style.boxShadow = `0 0 24px 8px hsl(${hue}, 90%, 70%, 0.7), 0 0 48px 16px hsl(${(hue+60)%360}, 90%, 70%, 0.4)`;
        // 让 trail 居中在鼠标点
        trail.style.left = `${x - size / 2}px`;
        trail.style.top = `${y - size / 2}px`;

        document.body.appendChild(trail);
        setTimeout(() => {
            trail.remove();
        }, 1000);
    } catch (error) {
        console.error('创建或删除鼠标轨迹时出错:', error);
    }
}
