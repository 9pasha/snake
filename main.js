const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const apple = document.getElementById('apple');
const scoreCount = document.getElementById('score');
const size = 20;
let posX = 200;
let posY = 200;
let amount = 0;

let snake = {
    length: [
        {posX: posX, posY: posY},
        {posX: posX-size, posY: posY},
        {posX: posX-2*size, posY: posY}],
    color: 'green',
    direction: ''
};

snake.head = snake.length[0];

let food = {
    position: {
        posX: 0,
        posY: 0
    },
    color: 'red'
};

document.addEventListener('keydown', function(e) {
    let key = e.keyCode;
    
    function direction(key) {
        if(key === 37 && snake.direction !== 'RIGHT') {
            snake.direction = 'LEFT';
        }
        else if(key === 38 && snake.direction !== 'DOWN') {
            snake.direction = 'UP';
        }
        else if(key === 39 && snake.direction !== 'LEFT') {
            snake.direction = 'RIGHT';
        }
        else if(key === 40 && snake.direction !== 'UP') {
            snake.direction = 'DOWN';
        }
        return snake.direction;
    }
    
    function move(obj, dir) {
        clearLastTarget(snake);
 
        if(dir === 'RIGHT') {
            obj.length.unshift(obj.length.pop());
            obj.length[0].posX = obj.length[1].posX+size;
            obj.length[0].posY = obj.length[1].posY;
            obj.head = obj.length[0];
        }
        else if(dir === 'LEFT') {
            obj.length.unshift(obj.length.pop());
            obj.length[0].posX = obj.length[1].posX-size;
            obj.length[0].posY = obj.length[1].posY;
            obj.head = obj.length[0];
        }
        else if(dir === 'UP') {
            obj.length.unshift(obj.length.pop());
            obj.length[0].posX = obj.length[1].posX;
            obj.length[0].posY = obj.length[1].posY-size;
            obj.head = obj.length[0];         
        }
        else if(dir === 'DOWN') {
            obj.length.unshift(obj.length.pop());
            obj.length[0].posX = obj.length[1].posX;
            obj.length[0].posY = obj.length[1].posY+size;
            obj.head = obj.length[0];
        }

        checkOverField(snake, 660, 660);
        drawTarget(obj.head.posX, obj.head.posY, obj.color);
    }

    function checkOverField(obj, width, height) {
        if(obj.head.posX > width || obj.head.posX < 0 || obj.head.posY > height || obj.head.posY < 0) {
            if(obj.head.posX > width) {
                obj.head.posX = 0;
            }
            else if(obj.head.posX < 0) {
                obj.head.posX = width - 20;
            }
            if(obj.head.posY > height) {
                obj.head.posY = 0;
            }
            else if(obj.head.posY < 0) {
                obj.head.posY = height - 20;
            }
        } 
    }

    direction(key);
    move(snake, snake.direction);
    snake.crush();
    snake.eat();
});

snake.crush = () => {
    for(let i = 1; i < snake.length.length; i++) {
        if(snake.head.posX == snake.length[i].posX && snake.head.posY == snake.length[i].posY) {
            alert("You're loose(((( Press F5 to start new game");
            ctx.clearRect(0, 0, 660, 660);
        }
    }
};

snake.eat = () => {
    if(food.position.posX === snake.head.posX & food.position.posY === snake.head.posY) {
        amount += 15;
        scoreCount.innerHTML = amount;  
        snake.length.push({posX: 0, posY: 0});
        food.create(food, 660, 660);
    }
};

function drawTarget(x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.closePath();
}

function clearLastTarget(obj) {
    let len = obj.length.length;
    let posX = obj.length[len-1].posX;
    let posY = obj.length[len-1].posY;
    ctx.clearRect(posX, posY, size, size);
}

function drawStartSnake(obj) {
    for(i in obj.length) {
        drawTarget(obj.length[i].posX, obj.length[i].posY, obj.color);
    }
}

food.create = (obj, width, height) => {
    let x = Math.floor(Math.random() * (width-35)/20)*20; 
    let y = Math.floor(Math.random() * (height-35)/20)*20;
    let correct = true;

    for(i in snake.length) {
        if(x == snake.length[i].posX && y == snake.length[i].posY) {
            correct = false;
            food.create(food, 660, 660);
        }
    }

    if(correct) {
        obj.position.posX = x;
        obj.position.posY = y;
        ctx.drawImage(apple, obj.position.posX, obj.position.posY, 20, 20);
    }  
};

window.onload = () => {
    drawStartSnake(snake);
    food.create(food, 640, 640);
};
