(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let mouseX = 0, mouseY = 0;
    let dots = [];

    // 设置 Canvas 覆盖全屏
    canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:99999;';
    document.body.appendChild(canvas);

    // 监听窗口大小变化
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 监听鼠标移动
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // 每次移动添加一个新的点
        dots.push({ x: mouseX, y: mouseY, life: 100 });
    });

    // 动画循环
    function animate() {
        // 使用半透明矩形覆盖实现“淡出”效果
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制所有点
        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            dot.life--; // 生命周期减少

            if (dot.life <= 0) {
                dots.splice(i, 1); // 移除死亡的点
                i--;
                continue;
            }

            // 绘制圆点（颜色和大小可自定义）
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${dot.life / 100})`; // 透明度随生命周期变化
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }
    animate();
})();