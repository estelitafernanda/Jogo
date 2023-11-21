const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false,
        hold: false
    },
    space: {
        pressed: false,
        hold: false
    },
}



window.addEventListener("keydown", e =>{
    let key = e.key

    switch(key){
        case "ArrowLeft":
        case "a":
            keys.a.pressed = true
            bonequinha.lastKeyPressed = key
            break;
        case "ArrowRight":
        case "d":
            keys.d.pressed = true
            bonequinha.lastKeyPressed = key
            break;
        case "ArrowUp":
        case "w":
            keys.w.pressed = true 
            break;
        case "z":
        case " ":
            keys.space.pressed = true
            break;
    }
})
window.addEventListener("keyup", e =>{
    let key = e.key

    switch(key){
        case "ArrowLeft":
        case "a":
            keys.a.pressed = false
            break;
        case "ArrowRight":
        case "d":
            keys.d.pressed = false
            break;
        case "ArrowUp":
        case "w":
            keys.w.pressed = false
            keys.w.hold = false
            break;
        case "z":
        case " ":
            keys.space.pressed = false
            keys.space.hold = false
            break
    }
})
function handleControls() {
    bonequinha.setSprite("idle");

    if (!bonequinha.onGround) bonequinha.setSprite("jumping"); 

    movement();

    function movement() {
        bonequinha.velocity.x = 0;

        if (keys.a.pressed && ["a", "ArrowLeft"].includes(bonequinha.lastKeyPressed)) {
            bonequinha.velocity.x = -1.2 * 3.4;
            bonequinha.facing = "left";

            if (!bonequinha.onGround) return;

            bonequinha.setSprite("running");
        }
        if (keys.d.pressed && ["d", "ArrowRight"].includes(bonequinha.lastKeyPressed)) {
            bonequinha.velocity.x = 1.2 * 3.4;
            bonequinha.facing = "right";

            if (!bonequinha.onGround) return;
            bonequinha.setSprite("running");
        }
        
        if (keys.w.pressed && !keys.w.hold) {
            bonequinha.jump();
            keys.w.hold = true;
            bonequinha.setSprite("jumping")
        }
    }
}
