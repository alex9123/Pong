// Pong
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");

let key = []

let player1 = {
    x: 10,
    y: 10,
    width: 5,
    length: 25
}

let player2 = {
    x: cnv.width - 12,
    y: 10,
    width: 5,
    length: 25
}

let ball = {
    x: cnv.width/2 - 5,
    y: cnv.height/2 - 5,
    velocity: 1,
    sideLength: 5
}


function update() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    move(); // Player Movement
    
    ballfunc(); // Ball Movement

    requestAnimationFrame(update);
}

function move() {
    
    if (key[87] && player1.y > 0) { // W
        player1.y-- 
    }

    if (key[83] && player1.y < cnv.height - player1.length) { // S
        player1.y++
    }

    if (key[38] && player2.y > 0) { // Arrow Up
        player2.y-- 
    }

    if (key[40] && player2.y < cnv.height - player2.length) { // Arrow Down
        player2.y++
    }


    ctx.fillStyle = "white"
    ctx.fillRect(player1.x, player1.y, player1.width, player1.length)
    ctx.fillRect(player2.x, player2.y, player2.width, player2.length)
}

function collision(ball, player) {
    if (ball.x < player.x + player.width &&
        ball.x + ball.sideLength > player.x &&
        ball.y < player.y + player.length &&
        ball.sideLength + ball.y > player.y) {
            if (ball.y < player.y + player.length) {
                return true
            }
        }

    return false
}


function ballfunc() {

    if (ball.y > cnv.height - ball.sideLength || ball.y < 0) { // If ball hits top and bottom
        ball.velocityY *= -1
    }
 
    if (collision(ball, player1) || collision(ball, player2)) { // collide with paddle
        ball.velocityX *= -1

        
    }

    if (ball.x > cnv.width - 5) { // Give point to Player 1
        ball.x = cnv.width/2 - ball.sideLength
        ball.y = cnv.height/2 - ball.sideLength

        ball.velocityX *= -1
    }

    if (ball.x < 0) { // Give point to Player 2
        ball.x = cnv.width/2 - ball.sideLength
        ball.y = cnv.height/2 - ball.sideLength

        ball.velocityX *= -1
    }


    ball.y += Math.cos(bullets[i].direction) * ball.velocity
    ball.x += Math.sin(bullets[i].direction) * bullets[i].Bspeed

    ctx.fillRect(ball.x, ball.y, ball.sideLength, ball.sideLength)
}


document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    key[event.keyCode] = true;
}

function keyupHandler(event) {
    key[event.keyCode] = false;
}

requestAnimationFrame(update);