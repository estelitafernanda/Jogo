const gravity = 0.2

const floorHeight = 155

const backgroundSpritePath = "/mapa/imagem.jpg";
const defaultObjectSpritePath ="/objects/square.svg";
const backgroundSpritePath2 = "/mapa/mapacont.jpg";

class Sprite {
    constructor( {position, velocity, source, scale, offset, sprites} ){
      this.position = position;
      this.velocity = velocity;
      
      this.scale = scale || 1
      this.image = new Image()
      this.image.src = source || defaultObjectSpritePath

      this.width = this.image.width * this.scale;
      this.height = this.image.height * this.scale;
    

      this.width = this.image.width * this.scale
      this.height = this.image.height * this.scale


      this.offset = offset || {
          x: 0,
          y: 0
      }

      this.sprites = sprites || {
          idle: {
              src: this.image.src,
              totalSpriteFrames: 1,
              framesPerSpriteFrame: 1
          }
      }

      this.currentSprite = this.sprites.idle

      this.currentSpriteFrame = 0
      this.elapsedTime = 0
      this.totalSpriteFrames = this.sprites.idle.totalSpriteFrames
      this.framesPerSpriteFrame = this.sprites.idle.framesPerSpriteFrame
      this.hasChangedBackground = false;
    }

    setSprite(sprite){
        this.currentSprite = this.sprites[sprite]

        if (!this.currentSprite){
            this.currentSprite = this.sprites.idle
        }
    }

    loadSprite(){
      let previousSprite = this.image.src

      this.image = new Image()
      this.image.src = this.currentSprite.src
      this.width = this.image.width * this.scale
      this.height = this.image.height * this.scale

      this.totalSpriteFrames = this.currentSprite.totalSpriteFrames
      this.framesPerSpriteFrame = this.currentSprite.framesPerSpriteFrame

      let newSprite = this.image.src

      if (previousSprite !== newSprite){

          console.log("Detected sprite change: ", previousSprite.split("/").pop(), " -> ", newSprite.split("/").pop())
              
          let previousSpriteImage = new Image()
          previousSpriteImage.src = previousSprite

          this.position.y += (previousSpriteImage.height - this.image.height) * this.scale
      }
    }

    draw (){
        context.imageSmoothingEnabled = false;


        const xScale = this.facing === "left" ? -1 : 1;

        context.save();
        context.translate(this.position.x + this.offset.x, this.position.y + this.offset.y);
        context.scale(xScale, 1); 

        context.drawImage(
          this.image,
          this.currentSpriteFrame * this.image.width / this.totalSpriteFrames,
          0,
          this.image.width / this.totalSpriteFrames,
          this.image.height, 
          0,
          0,
          this.width / this.totalSpriteFrames * xScale,
          this.height
        );
        
        context.restore();
    }
    animate(){
        this.elapsedTime += 1

        if (this.elapsedTime >= this.framesPerSpriteFrame) {
            this.currentSpriteFrame += 1

            if (this.currentSpriteFrame >= this.totalSpriteFrames) {
                this.currentSpriteFrame = 0
            }

            this.elapsedTime = 0
            
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;
        }
      
    }
    changeBackground(newBackground) {
      let previousImage = this.image; // Salva a imagem anterior
      this.image = new Image();
      this.image.src = newBackground;
      this.source = newBackground;
      this.hasChangedBackground = true;

      // Atualiza as propriedades de largura e altura com base na nova imagem
      this.width = this.image.width * this.scale;
      this.height = this.image.height * this.scale;

      // Atualiza a posição vertical para ajustar à nova imagem
      this.position.y += (previousImage.height - this.image.height) * this.scale;
    }
    update (){
        this.draw();
        this.animate();
    }
}

class Fighter extends Sprite{
    constructor({
        position,
        velocity,
        scale,
        sprites
    }) {
        super({
            position,
            velocity,
            scale,
            sprites,
        })

        this.velocity = velocity;
        this.lastKeyPressed;
        this.onGround = false;
        this.answeredCorrectly = true;
    }

    gravity (){
      if (this.position.y + this.height >= canvas.height - floorHeight) {
        this.onGround = true
      } else {
        this.onGround = false;
      }

      if (this.position.x < 0) {
        this.position.x = 0;
      }

      if (this.position.y + this.height > canvas.height - floorHeight) {
        this.position.y = canvas.height - this.height - floorHeight
        this.velocity.y = 0
      } else {
          if (!this.onGround) this.velocity.y += gravity
      }

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

    }
    jump(){
      if (!this.onGround) return
      this.velocity.y = -7.5
    } 
    update(){
        handleControls();
        if (this.position.x < 0) {
          this.position.x = 0;
        }
        if (this.position.y < 0) {
          this.position.y = 0;
          this.velocity.y = 0;
        } 
        this.gravity();
        this.loadSprite();
        this.draw(); 
        this.animate();
    }
    checkBoundary() {
      if (this.position.x + this.width / 13 >= canvas.width && this.answeredCorrectly) {
          // A boneca atingiu o limite da tela à direita, então você pode chamar uma função para alterar a imagem de fundo.
          background.changeBackground(backgroundSpritePath2);
          this.position.x = canvas.width - this.width;

          this.answeredCorrectly = false;
      }
    }
}

const bonequinha = new Fighter({
    position: {
      x: 50, 
      y: 0
    },
    velocity: {
      x: 0,
      y: 5
    },
    scale: 1,
    sprites: {
       idle: {
          src: "/sprites/idleboneca.png",
          totalSpriteFrames: 8,
          framesPerSpriteFrame: 37
       },
       running: {
          src: "/sprites/runboneca.png",
          totalSpriteFrames: 8,
          framesPerSpriteFrame: 6
       },
       jumping: {
          src: "/sprites/jumpboneca.png",
          totalSpriteFrames: 8,
          framesPerSpriteFrame: 16
       }
    }   
})

const background = new Sprite({
    position:{
      x: 0,
      y: 0
    },
    source: backgroundSpritePath
})

