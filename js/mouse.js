document.addEventListener('mousemove', function(event) {
    createtrail(event.pageX, event.pageY);
});

function createtrail(x, y) {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    rail.style.left = `${x - 5}px`;
    trail.style.top = `${y - 5}px`;
    Document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 500);
}   
