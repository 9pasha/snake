const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const apple = document.getElementById('apple');
const scoreCount = document.getElementById('score');
const size = 20;
let amount = 0;

let snake = {
    length: [
        {posX: 200, posY: 200},
        {posX: 200-size, posY: 200}],
    color: 'green',
    direction: 'RIGHT'
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
    }

    direction(key);
});

snake.move = (obj, dir) => {
    let len = obj.length.length;
    let posX = obj.length[len-1].posX;
    let posY = obj.length[len-1].posY;

    ctx.clearRect(posX, posY, size, size);
   
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
    
    snake.checkOverField(snake, 660, 660);
    snake.crush();
    snake.eat();
    snake.drawBody(obj.head.posX, obj.head.posY, obj.color);

    setTimeout(function() {
        snake.move(snake, snake.direction);
    }, 60);
};

snake.checkOverField = (obj, width, height) => {
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
};

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

snake.drawBody = (x, y, color) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.closePath();
};

snake.drawStartSnake = (obj) => {
    for(i in obj.length) {
        snake.drawBody(obj.length[i].posX, obj.length[i].posY, obj.color);
    }
};

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
    snake.drawStartSnake(snake);
    food.create(food, 640, 640);
    snake.move(snake, snake.direction);
};
