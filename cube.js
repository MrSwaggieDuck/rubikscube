let anglex = 0
let angley = 0
let cube_colors;

let U = 0;
let D = 1
let F = 2
let B = 3
let R = 4
let L = 5

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 70) {
        if (!e.shiftKey) {
            Cube.move('F+')
        } else {
            Cube.move('F-')
        }
    }
})

function setup() {
    createCanvas(800, 800, WEBGL)

    cube_colors = {
        red: color('#B90000'),
        green: color('#009B48'),
        blue: color('#0045AD'),
        yellow: color('#FFD500'),
        white: color('#FFFFFF'),
        orange: color('#FF5900')
    }

    Cube = new Cube(100)

    createEasyCam()
}

function draw() {
    background(50)
    
    Cube.draw()
    
}

function Rotate(cube, move){
    if (move == 'F+') {
        console.log('Move: F+')

        for (x = 0; x < cube.length; x++) {
            for (y = 0; y < cube[x].length; y++) {
                cube[x][y][2].rotateZ(true)
            }
        }
        store = cube[0][0][2]
        cube[0][0][2] = cube[0][2][2]
        cube[0][2][2] = cube[2][2][2]
        cube[2][2][2] = cube[2][0][2]
        cube[2][0][2] = store

    } else if (move == 'F-') {
        console.log('Move: F-')

        for (x = 0; x < cube.length; x++) {
            for (y = 0; y < cube[x].length; y++) {
                cube[x][y][2].rotateZ(false)
            }
        }
    } else if (move == 'R+') {
        console.log('Move: R+');
        for (y = 0; y < cube.length; y++) {
            for (z = 0; z < cube[2][y].length; z++) {
                cube[2][y][z].rotateX(true)
            }
        }
    }

}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}