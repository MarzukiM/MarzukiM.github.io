document.addEventListener('mousemove', function(event) {
    createtrail(event.pageX, event.pageY);
});

function createtrail(x, y) {
    try {
        const trail = document.createElement('div');
        trail.classList.add('trail');
        trail.style.left = `${x - 5}px`; // 修正了这里的变量名拼写错误，原来是 rail
        trail.style.top = `${y - 5}px`;
        document.body.appendChild(trail); // 修正了这里的 Document 为小写的 document

        setTimeout(() => {
            trail.remove();
        }, 500);
    } catch (error) {
        console.error('创建或删除鼠标轨迹时出错:', error);
    }
}
