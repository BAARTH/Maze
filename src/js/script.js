path_width = 10;
wall = 2;
outter_wall = 2;
width = 50;
height = 50;
delay = 1;
x = width / 2;
y = height / 2;

path_color = '#d61996';

function generate(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init_maze() {
    offset = path_width / 2 + outter_wall;
    maze = [];
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    canvas.width = outter_wall * 2 + width * (path_width + wall) - wall;
    canvas.height = outter_wall * 2 + height * (path_width + wall) - wall;
    context.fillStyle = '#b7ddda';
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.strokeStyle = '#d61996';
    context.lineCap = 'square';
    context.lineWidth = path_width;
    context.beginPath();

    for (var i = 0; i < height * 2; i++) { // Create Map
        maze[i] = [];
        for (var j = 0; j < width * 2; j++) {
            maze[i][j] = false;
        }
    }

    path_history = [
        [x, y]
    ];
    context.moveTo(x * (path_width + wall) + offset, y * (path_width + wall) + offset);
}
init_maze();

function loop() {

    x = path_history[path_history.length - 1][0]
    y = path_history[path_history.length - 1][1]

    var directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    var alternatives = [];

    for (var i = 0; i < directions.length; i++) {
        if (maze[(directions[i][1] + y) * 2] != undefined && maze[(directions[i][1] + y) * 2][(directions[i][0] + x) * 2] == false) {
            alternatives.push(directions[i]);
        }
    }

    if (alternatives.length == 0) {
        path_history.pop();
        if (path_history.length > 0) {
            context.moveTo(path_history[path_history.length - 1][0] * (path_width + wall) + offset, path_history[path_history.length - 1][1] * (path_width + wall) + offset);
            timer = setTimeout(loop, delay);
        }
        return;
    }
    direction = alternatives[generate(0, alternatives.length - 1)];
    path_history.push([direction[0] + x, direction[1] + y])
    context.lineTo((direction[0] + x) * (path_width + wall) + offset, (direction[1] + y) * (path_width + wall) + offset);
    maze[(direction[1] + y) * 2][(direction[0] + x) * 2] = true;
    maze[direction[1] + y * 2][direction[0] + x * 2] = true;
    context.stroke();
    timer = setTimeout(loop, delay);
}
loop();
