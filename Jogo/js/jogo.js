let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

const desiredFPS = 120; 
const frameTime = 1000 / desiredFPS; 

let prevTime =  performance.now();
let lag = 0;

function animate(){
    const currentTime = performance.now();
    const elapsed = currentTime - prevTime;
    prevTime = currentTime;
    lag += elapsed;

    
    handleControls();
    
    while (lag >= frameTime) {
        bonequinha.checkBoundary();

        background.update();
        bonequinha.update(); 
        lag -= frameTime;

    }

    window.requestAnimationFrame(animate);
   
} 
animate();


  

