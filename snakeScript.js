
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var left = false;
var down = false;
var right = false;
var up = false;

var vertical = 0;
var horizontal = 0;

var snake = [{x:70, y: 190}, {x: 50, y: 190}, {x: 30, y: 190}];

var apple = {
	x: 300,
	y: 200,
	radius: 10,
	status: 1,
	color: "red",
	draw: function() {
		if (apple.status == 1) {
		ctx.beginPath();
		ctx.arc(apple.x, apple.y, apple.radius, 0, Math.PI*2, false);
		ctx.fillStyle = apple.color;
		ctx.fill();
		ctx.closePath();
		}
	}
};

var score = {
	x: 3,
	y: 15,
	value: 0,
	font: "16px Times",
	color: "orange",
	draw: function() {
		ctx.font = this.font;
		ctx.fillStyle = this.color;
		ctx.fillText("SCORE: " + this.value, this.x, this.y);
	}
};

function setBounds() {
	const marginLeft = snake[0].x + horizontal < 0;
	const marginUp = snake[0].y + vertical < 0;
	const marginRight = snake[0].x > canvas.width;
	const marginDown = snake[0].y > canvas.height;
	if (marginLeft || marginUp || marginRight || marginDown) {
		alert("GAME OVER");
		clearInterval(movement);
		document.location.reload();
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
	ctx.fillStyle = "brown";
	ctx.strokeStyle = "yellow";
	ctx.fillRect(snake[0].x, snake[0].y, 20, 20);
	for (let i = 1; i < snake.length; ++i) {
		ctx.fillStyle = "darkred";
		ctx.strokeStyle = "brown";
		ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
		ctx.strokeRect(snake[i].x, snake[i].y, 20, 20);
	}
}

function randomApple() {
	apple.x = Math.floor(Math.random() * (canvas.width - 2 * apple.radius)) + apple.radius;
	apple.y = Math.floor(Math.random() * (canvas.height - 2 * apple.radius)) + apple.radius;
	apple.status = 1;
}

function eatApple() {
	if (apple.x + 10 > snake[0].x && apple.x < snake[0].x + 20 && apple.y + 10 > snake[0].y && apple.y < snake[0].y + 20) {
		++score.value;
		//
		apple.status = 0;
		randomApple();	
	} else if (left || down || right || up) {
		snake.pop();
	}
}

function move() {
	const snakeHead = {x: snake[0].x + horizontal, y: snake[0].y + vertical};
	if (left) {
		vertical = 0;
		horizontal = -20;
		snake.unshift(snakeHead);
	}
	if (down) {
		vertical = -20;
		horizontal = 0;
		snake.unshift(snakeHead);
	}
	if (right) {
		vertical = 0;
		horizontal = 20;
		snake.unshift(snakeHead);
	}
	if (up) {
		vertical = 20;
		horizontal = 0;
		snake.unshift(snakeHead);
	}
}

document.addEventListener("keydown", direction, false);

function direction(e) {
	if (e.keyCode == 37 && !right) {
		left = true;
		down = false;
		right = false;
		up = false;
	}
	if (e.keyCode == 38 && !up) {
		left = false;
		down = true;
		right = false;
		up = false;
	}
	if (e.keyCode == 39 && !left) {
		left = false;
		down = false;
		right = true;
		up = false;
	}
	if (e.keyCode == 40 && !down) {
		left = false;
		down = false;
		right = false;
		up = true;
	}
	e.preventDefault();
}

var movement = setInterval(startGame, 150);

function startGame() {
	clearCanvas();
	setBounds();
	drawSnake();
	apple.draw();
	score.draw();
	move();
	eatApple();
}
