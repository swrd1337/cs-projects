// Here we get Canvas and Canvas 2D Context.
const canvas = document.getElementById('ball-survive');
const getCanvasContext = () => canvas.getContext ? canvas.getContext('2d') : null;

function setupCanvasSize() {
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;
   
    window.addEventListener('resize', e => {
        canvas.width = window.innerWidth - 100;
        canvas.height = window.innerHeight - 100;
    })
}

setupCanvasSize();