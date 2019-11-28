function Cube(len) {
    this.state = [
        Array(9).fill(cube_colors.white),
        Array(9).fill(cube_colors.yellow),
        Array(9).fill(cube_colors.green),
        Array(9).fill(cube_colors.blue),
        Array(9).fill(cube_colors.red),
        Array(9).fill(cube_colors.orange)
    ]
    this.len = len

    this.draw = function() {
        // UP
        for(i = 0; i < 9; i++) {
            y = Math.floor(i / 3) * this.len
            x = (i % 3) * this.len
            l = this.len
            fill(this.state[U][i])
            push()
            translate(-this.len*1.5, -this.len*1.5, -this.len*1.5)
            beginShape()
            vertex(x, 0, y)
            vertex(x + l, 0, y)
            vertex(x + l, 0, y + l)
            vertex(x, 0, y + l)
            endShape(CLOSE)
            pop()
        }

        // DOWN
        for(i = 0; i < 9; i++) {
            y = Math.floor(i / 3) * -this.len
            x = (i % 3) * this.len
            l = this.len
            fill(this.state[D][i])
            push()
            translate(-this.len*1.5, this.len*1.5, this.len*1.5)
            beginShape()
            vertex(x, 0, y)
            vertex(x + l, 0, y)
            vertex(x + l, 0, y - l)
            vertex(x, 0, y - l)
            endShape(CLOSE)
            pop()
        }

        // FRONT
        for(i = 0; i < 9; i++) {
            y = Math.floor(i / 3) * this.len
            x = (i % 3) * this.len
            l = this.len
            fill(this.state[F][i])
            push()
            translate(-this.len*1.5, -this.len*1.5, this.len*1.5)
            beginShape()
            vertex(x, y, 0)
            vertex(x + l, y, 0)
            vertex(x + l, y + l, 0)
            vertex(x, y + l, 0)
            endShape(CLOSE)
            pop()
        }

        // BACK
        for(i = 0; i < 9; i++) {
            y = Math.floor(i / 3) * this.len
            x = (i % 3) * -this.len
            l = this.len
            fill(this.state[B][i])
            push()
            translate(this.len*1.5, -this.len*1.5, -this.len*1.5)
            beginShape()
            vertex(x, y, 0)
            vertex(x - l, y, 0)
            vertex(x - l, y + l, 0)
            vertex(x, y + l, 0)
            endShape(CLOSE)
            pop()
        }

        // RIGHT
        for(i = 0; i < 9; i++) {
            y = Math.floor(i / 3) * this.len
            x = (i % 3) * -this.len
            l = this.len
            fill(this.state[R][i])
            push()
            translate(this.len*1.5, -this.len*1.5, this.len*1.5)
            beginShape()
            vertex(0, y, x)
            vertex(0, y, x - l)
            vertex(0, y + l, x - l)
            vertex(0, y + l, x)
            endShape(CLOSE)
            pop()
        }

        // LEFT
        for(i = 0; i < 9; i++) {
            y = Math.floor(i / 3) * this.len
            x = (i % 3) * this.len
            l = this.len
            fill(this.state[L][i])
            push()
            translate(-this.len*1.5, -this.len*1.5, -this.len*1.5)
            beginShape()
            vertex(0, y, x)
            vertex(0, y, x + l)
            vertex(0, y + l, x + l)
            vertex(0, y + l, x)
            endShape(CLOSE)
            pop()
        }

    }

    this.move = function(move) {
        if (move == 'F+') {
            // CORNERS
            store = [this.state[F][0], this.state[U][6], this.state[L][2]];
            this.state[F][0] = this.state[F][6];
            this.state[U][6] = this.state[L][8];
            this.state[L][2] = this.state[D][0];

            this.state[F][6] = this.state[F][8];
            this.state[D][0] = this.state[R][6];
            this.state[L][8] = this.state[D][2];

            this.state[F][8] = this.state[F][2];
            this.state[D][2] = this.state[R][0];
            this.state[R][6] = this.state[U][8];

            this.state[F][2] = store[0];
            this.state[U][8] = store[2];
            this.state[R][0] = store[1];
            // EDGES
            store = [this.state[F][1], this.state[U][7]];
            this.state[F][1] = this.state[F][3];
            this.state[U][7] = this.state[L][5];

            this.state[F][3] = this.state[F][7];
            this.state[L][5] = this.state[D][1];

            this.state[F][7] = this.state[F][5];
            this.state[D][1] = this.state[R][3];

            this.state[F][5] = store[0];
            this.state[R][3] = store[1];
        } else if (move == 'F-') {
            store = [this.state[F][0], this.state[U][6], this.state[L][2]];
            // CORNERS
            this.state[F][0] = this.state[F][2];
            this.state[U][6] = this.state[R][0];
            this.state[L][2] = this.state[U][8];

            this.state[F][2] = this.state[F][8];
            this.state[R][0] = this.state[D][2];
            this.state[U][8] = this.state[R][6];

            this.state[F][8] = this.state[F][6];
            this.state[R][6] = this.state[D][0];
            this.state[D][2] = this.state[L][8];

            this.state[F][6] = store[0];
            this.state[D][0] = store[2];
            this.state[L][8] = store[1];

            // EDGES
            store = [this.state[F][1], this.state[U][7]];
            this.state[F][1] = this.state[F][5];
            this.state[U][7] = this.state[R][3];

            this.state[F][5] = this.state[F][7];
            this.state[R][3] = this.state[D][1];

            this.state[F][7] = this.state[F][3];
            this.state[D][1] = this.state[L][5];

            this.state[F][3] = store[0];
            this.state[L][5] = store[1] ;
        } else if (move == 'R+') {
            // CORNERS
            store = [this.state[F][2], this.state[R][0], this.state[U][8]];
            this.state[F][2] = this.state[D][2];
            this.state[R][0] = this.state[R][6];
            this.state[U][8] = this.state[F][8];

            this.state[D][2] = this.state[B][6];
            this.state[R][6] = this.state[R][8];
            this.state[F][8] = this.state[D][8];

            this.state[B][6] = this.state[U][2];
            this.state[R][8] = this.state[R][2];
            this.state[D][8] = this.state[B][0];

            this.state[U][2] = store[0];
            this.state[R][2] = store[1];
            this.state[B][0] = store[2];

            // EDGES
            store = [this.state[R][1], this.state[U][5]];
            this.state[R][1] = this.state[R][3];
            this.state[U][5] = this.state[F][5];

            this.state[R][3] = this.state[R][7];
            this.state[F][5] = this.state[D][5];

            this.state[R][7] = this.state[R][5];
            this.state[D][5] = this.state[B][3];

            this.state[R][5] = store[0];
            this.state[B][3] = store[1];
            
        } else if (move == 'R-') {
            // CORNERS
            store = [this.state[F][2], this.state[R][0], this.state[U][8]]
            this.state[F][2] = this.state[U][2]
            this.state[R][0] = this.state[R][2]
            this.state[U][8] = this.state[B][0]

            this.state[U][2] = this.state[B][6]
            this.state[R][2] = this.state[R][8]
            this.state[B][0] = this.state[D][8]

            this.state[B][6] = this.state[D][2]
            this.state[R][8] = this.state[R][6]
            this.state[D][8] = this.state[F][8]

            this.state[D][2] = store[0]
            this.state[R][6] = store[1]
            this.state[F][8] = store[2]

            //EDGES
            store = [this.state[R][1], this.state[U][5]]
            this.state[R][1] = this.state[R][5]
            this.state[U][5] = this.state[B][3]

            this.state[R][5] = this.state[R][7]
            this.state[B][3] = this.state[D][5]

            this.state[R][7] = this.state[R][3]
            this.state[D][5] = this.state[F][5]

            this.state[R][3] = store[0]
            this.state[F][5] = store[1]
        }
    }
}