// Pong
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d")

cnv.width = 700
cnv.height = 500

let key = []

let playerSpeed = 7

let player1 = {
    x: 10,
    y: 100,
    width: 11,
    length: 70,
    score: 0,
}

let player2 = {
    x: cnv.width - 21,
    y: 100,
    width: 11,
    length: 70,
    score: 0,
}

let ball = {
    x: cnv.width/2 - 5,
    y: cnv.height/2 - 5,
    velocity: 6,
    sideLength: 12,
    direction: Math.atan2(0, -10)
}

let storedBallp = []

function update() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    move(); // Player Movement
    
    ballfunc(); // Ball Movement

    score(); // Draw Score

    requestAnimationFrame(update);
}

function move() {
    
    // if (key[87] && player1.y > 0) { // W
    //     player1.y -= playerSpeed
    // }

    // if (key[83] && player1.y < cnv.height - player1.length) { // S
    //     player1.y += playerSpeed
    // }


    // Decide which side of paddle to hit ball pased on oponent position
    let paddleSide 
    if (player2.y > cnv.height/2) { 
        paddleSide = player1.length
    } else {
        paddleSide = 0
    }
    // Round values so paddle does not look weird
    let player1p = Math.round((player1.y + paddleSide)/playerSpeed) * playerSpeed
    let ballp = Math.round((ball.y + ball.sideLength/2)/playerSpeed) * playerSpeed
    
    if (ball.x < cnv.width/2) { // if player is past halfway point
        if (player1p > ballp && player1.y > 0) { // if ball above player
            player1.y -= playerSpeed
        } else if (player1p < ballp && player1.y < cnv.height - player1.length) { // if ball is below
            player1.y += playerSpeed
        }
    }

    if (key[38] && player2.y > 0) { // Arrow Up
        player2.y -= playerSpeed 
    }

    if (key[40] && player2.y < cnv.height - player2.length) { // Arrow Down
        player2.y += playerSpeed
    }


    ctx.fillStyle = "white"
    ctx.fillRect(player1.x, player1.y, player1.width, player1.length)
    ctx.fillRect(player2.x, player2.y, player2.width, player2.length)
}


// collision and calculate what angle ball bounces depending on where on paddle it hits
function collision(ball, player) {
    let unit = 90/player.length
    if (ball.x < player.x + player.width &&
        ball.x + ball.sideLength > player.x &&
        ball.y < player.y + player.length &&
        ball.sideLength + ball.y > player.y
      ) {
            ball.velocity = 12
            let ballPos = ball.y + ball.sideLength/2
            if (ballPos - player.y <= player.length/2) { // top paddle
                return (360 - (unit * (player.length/2 - (ballPos - player.y)))) * Math.PI/180
            } else if (ballPos - player.y >= player.length/2) // bottom paddle
                return (unit * ((ballPos - player.y) - player.length/2)) * Math.PI/180
        }
        
    return false
}

function ballfunc() {
    if (ball.y + ball.sideLength > cnv.height || ball.y < 0) { // If ball hits top and bottom
        ball.direction = 2 * Math.PI - ball.direction  
    }
    
    if (collision(ball, player1)) { // collide with player 1 paddle
        ball.direction = Math.PI - collision(ball, player1) // Math.PI in front to reverse angle
    } else if (collision(ball, player2)) { // collide with player 2 paddle
        ball.direction = collision(ball, player2)
    }


    if (ball.x > cnv.width - 5) { // Give point to Player 1
        ball.x = cnv.width/2 - ball.sideLength
        ball.y = cnv.height/2 - ball.sideLength
        player1.score ++
        ball.direction = 0
        ball.velocity = 6
    }

    if (ball.x < 0) { // Give point to Player 2
        ball.x = cnv.width/2 - ball.sideLength
        ball.y = cnv.height/2 - ball.sideLength
        player2.score ++

        ball.direction = Math.PI
        ball.velocity = 6
    }

    // draw ball
    ball.x += Math.cos(ball.direction) * -ball.velocity
    ball.y += Math.sin(ball.direction) * ball.velocity
    

    ctx.fillRect(ball.x, ball.y, ball.sideLength, ball.sideLength)
}

function score() {
    ctx.fillStyle = "white"
    ctx.font = '30px Fantasy';
    ctx.fillText(player1.score, cnv.width/2 - 20, 35);
    ctx.fillText(player2.score, cnv.width/2 + 20, 35);
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