import platform from '../images/platform.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.5

class Player {
    constructor() {
        
        this.position = {
            x: 100,
            y: 100
        }
        
        this.velocity = {
            x:0,
            y: 0
        }

        this.width = 30,
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y +this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor({x, y, image}) {                

        this.position = {
            x: x,
            y: y
        }

        this.image = image;

        this.width = image.width;
        this.height = image.height;

    }    

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const image = new Image()
image.src = platform

const player = new Player();
const platforms = [
    new Platform({
        x: -1, 
        y: 470,
        image: image
    }), 
    new Platform({
        x: 500, 
        y: 300,
        image:image
    })
]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

player.update()

let scrollOffset = 0;

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width, canvas.height)

    player.update()

    platforms.forEach((plataform) => {
        plataform.draw()
    })

    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }else if(keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    }else {
        player.velocity.x = 0

        if(keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach((plataform) => {
                plataform.position.x -= 5
            })
        }else if(keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach((plataform) => {
                plataform.position.x += 5
            })
        }
    }
         
    platforms.forEach((plataform) => {
        if(
            player.position.y + player.height <= plataform.position.y &&        
            player.position.y + player.height + player.velocity.y >= plataform.position.y &&
            player.position.x + player.width >= plataform.position.x && 
            player.position.x <= plataform.position.x + plataform.width
        ){
            player.velocity.y = 0
        }
    })

    if(scrollOffset >= 2000){
        
    }
    
}

animate()

window.addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
        case 65: // left
            keys.left.pressed = true
            break;
        case 83: // down

            break;
        case 68: // right
            keys.right.pressed = true
            break;
        case 87: // up
            player.velocity.y -= 20;
            break;
    }
})


window.addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
        case 65: // left
            player.velocity.x = 0;
            keys.left.pressed = false
            break;
        case 83: // down
            
            break;
        case 68: // right            
            player.velocity.x = 0;
            keys.right.pressed = false
            break;
        case 87: // up
            
            break;
    }
})