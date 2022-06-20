
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

let snake = [{x:70, y: 190}, {x: 50, y: 190}, {x: 30, y: 190}];

let apple = {
	x: 300,
	y: 200,
	radius: 10,
	status: 1,
	color: "red",
	draw: function() {
		if (this.status == 1) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		}
	}
};

let score = {
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
	const marginLeft = snake[0].x < 0;
	const marginUp = snake[0].y < 0;
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

function radomApple() {
	apple.x = Math.floor(Math.random() * (canvas.width - 2 * apple.radius)) + apple.radius;
	apple.y = Math.floor(Math.random() * (canvas.height - 2 * apple.radius)) + apple.radius;
	apple.status = 1;
}

function eatApple() {
	if (apple.x + 10 > snake[0].x && apple.x < snake[0].x + 20 && apple.y + 10 > snake[0].y && apple.y < snake[0].y + 20) {
		++score.value;
		score.draw();
		apple.status = 0;
		radomApple();	
	} else {
		snake.pop();
	}
}

function directionMove(e) {
	let horizontal = 0;
	let vertical = 0;
	if (e.keyCode == 37) {
		horizontal = -20;
	} else if (e.keyCode == 38) {
		vertical = -20;
	} else if (e.keyCode == 39) {
		horizontal = 20;
	} else if (e.keyCode == 40) {
		vertical = 20;
	}
	e.preventDefault();
	const snakeHead = {x: snake[0].x + horizontal, y: snake[0].y + vertical};
	snake.unshift(snakeHead);
}

let movement = setInterval(startGame, 150);

function startGame() {
	clearCanvas();
	setBounds();
	drawSnake();
	apple.draw();
	directionMove();
	eatApple();
}
