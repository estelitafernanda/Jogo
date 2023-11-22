let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

const desiredFPS = 120; 
const frameTime = 1000 / desiredFPS; 

let prevTime =  performance.now();
let lag = 0;

function isCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}


function animate(){
    const currentTime = performance.now();
    const elapsed = currentTime - prevTime;
    prevTime = currentTime;
    lag += elapsed;

    
    handleControls();
    
    while (lag >= frameTime) {
        bonequinha.checkBoundary();

        openDialog();

        background.update();
        bonequinha.update(); 
        lag -= frameTime;

    }

    window.requestAnimationFrame(animate);
   
} 
animate();


  

