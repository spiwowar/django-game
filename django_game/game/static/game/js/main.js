var GamePanel = function() {
    var self = this;
    self.canvas_parent = document.getElementById("canvas_parent");
    var game_panel_canvas = document.createElement("canvas");
    self.canvas_parent.appendChild(game_panel_canvas);
    var ctx = game_panel_canvas.getContext("2d");
    var width = window.innerWidth;
    var height = window.innerHeight;
    game_panel_canvas.width = width;
    game_panel_canvas.height = height;

    this.width = width / 2;
    this.height = height / 2;
    this.x = width / 2 - width / 4;
    this.y = height / 2 - height / 4;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
}

var Position = function(x, y) {
    this.x = x;
    this.y = y;
}

function create_positions(rows, columns) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];
        for (var j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

var positions = create_positions(21, 21);

var Enemy = function(id, canvas_parent, game_panel, position) {

    var self = this;
    self.id = id;
    self.enemy_position = position;
    var horizontal_or_vertical = Math.floor(Math.random() * 2);

    var horizontal = Math.floor(Math.random() * 2);
    var vertical = Math.floor(Math.random() * 2);
    var frac = Math.floor(Math.random() * 21);

    var aaa = game_panel.width / 21;
    var bbb = game_panel.height / 21;

    if (self.enemy_position == null || self.enemy_position == undefined) {
        if (horizontal_or_vertical == 0) {
            if (horizontal == 0) {
                self.x = game_panel.x;
            } else if (horizontal == 1) {
                self.x = game_panel.x + game_panel.width - aaa;
            }
            self.y = game_panel.y + bbb * frac;
            self.enemy_position = new Position(Math.round((self.x - game_panel.x) / aaa) + 1, Math.round((self.y - game_panel.y) / bbb) + 1);
        } else if (horizontal_or_vertical == 1) {
            if (vertical == 0) {
                self.y = game_panel.y;
            } else if (vertical == 1) {
                self.y = game_panel.y + game_panel.height - bbb;
            }
            self.x = game_panel.x + aaa * frac;
            self.enemy_position = new Position(Math.round((self.x - game_panel.x) / aaa) + 1, Math.round((self.y - game_panel.y) / bbb) + 1);
        }
    } else {
        self.x = game_panel.x + (self.enemy_position.x - 1) * aaa;
        self.y = game_panel.y + (self.enemy_position.y - 1) * bbb;
    }

    var inner_canvas = document.createElement("canvas");
    canvas_parent.appendChild(inner_canvas);
    var ctx_inner = inner_canvas.getContext("2d");
    var width = window.innerWidth;
    var height = window.innerHeight;
    inner_canvas.width = width;
    inner_canvas.height = height;

    ctx_inner.rect(self.x, self.y, aaa, bbb);
    ctx_inner.fillStyle = 'red';
    ctx_inner.fillRect(self.x, self.y, aaa, bbb);
    ctx_inner.stroke();

    async function move() {
        while (true) {
            await sleep(750);
            approach_to_target();
        }
    }
    move();

    async function approach_to_target() {
        if (window.target_position.x < self.enemy_position.x) {
            moveLeft();
            updatePosition();
        } else if (window.target_position.x > self.enemy_position.x) {
            moveRight();
            updatePosition();
        } else if (window.target_position.y < self.enemy_position.y) {
            moveUp();
            updatePosition();
        } else if (window.target_position.y > self.enemy_position.y) {
            moveDown();
            updatePosition();
        }
    }

    function moveRight() {
        if (positions[self.enemy_position.x][self.enemy_position.y - 1] !== undefined && positions[self.enemy_position.x][self.enemy_position.y - 1] == 0) {
            ctx_inner.clearRect(0, 0, inner_canvas.width, inner_canvas.height);
            ctx_inner.beginPath();
            self.x = self.x + aaa;
            ctx_inner.rect(self.x, self.y, aaa, bbb);
            ctx_inner.fillStyle = 'red';
            ctx_inner.fillRect(self.x, self.y, aaa, bbb);
            ctx_inner.stroke();
            positions[self.enemy_position.x - 1][self.enemy_position.y - 1] = 0;
            self.enemy_position.x += 1;
            positions[self.enemy_position.x - 1][self.enemy_position.y - 1] = 1;
        }
    }

    function moveLeft() {
        if (positions[self.enemy_position.x - 2][self.enemy_position.y - 1] !== undefined && positions[self.enemy_position.x - 2][self.enemy_position.y - 1] == 0) {

            ctx_inner.clearRect(0, 0, inner_canvas.width, inner_canvas.height);
            ctx_inner.beginPath();
            self.x = self.x - aaa;
            ctx_inner.rect(self.x, self.y, aaa, bbb);
            ctx_inner.fillStyle = 'red';
            ctx_inner.fillRect(self.x, self.y, aaa, bbb);
            ctx_inner.stroke();
            positions[self.enemy_position.x - 1][self.enemy_position.y - 1] = 0;
            self.enemy_position.x -= 1;
            positions[self.enemy_position.x - 1][self.enemy_position.y - 1] = 1;
        }

    }

    function moveUp() {
        if (positions[self.enemy_position.x - 1][self.enemy_position.y - 2] !== undefined && positions[self.enemy_position.x - 1][self.enemy_position.y - 2] == 0) {

            ctx_inner.clearRect(0, 0, inner_canvas.width, inner_canvas.height);
            ctx_inner.beginPath();
            self.y = self.y - bbb;
            ctx_inner.rect(self.x, self.y, aaa, bbb);
            ctx_inner.fillStyle = 'red';
            ctx_inner.fillRect(self.x, self.y, aaa, bbb);
            ctx_inner.stroke();
            positions[self.enemy_position.x - 1][self.enemy_position.y - 1] = 0;
            self.enemy_position.y -= 1;
            positions[self.enemy_position.x - 1][self.enemy_position.y - 1] = 1;
        }

    }

    function moveDown() {
        if (positions[self.enemy_position.x - 1][self.enemy_position.y] !== undefined && positions[self.enemy_position.x - 1][self.enemy_position.y] == 0) {

            ctx_inner.clearRect(0, 0, inner_canvas.width, inner_canvas.height);
            ctx_inner.beginPath();
            self.y = self.y + bbb;
            ctx_inner.rect(self.x, self.y, aaa, bbb);
            ctx_inner.fillStyle = 'red';
            ctx_inner.fillRect(self.x, self.y, aaa, bbb);
            ctx_inner.stroke();
            positions[self.enemy_position.x - 1][self.enemy_position.y - 1] = 0;
            self.enemy_position.y += 1;
            positions[self.enemy_position.x - 1][self.enemy_position.y - 1] = 1;
        }

    }

    function updatePosition() {

        var xhttp = new XMLHttpRequest();
        var params = JSON.stringify({
            'id': self.id,
            'x': self.enemy_position.x,
            'y': self.enemy_position.y
        });

        xhttp.open("POST", "update_enemy/", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //console.log(this.responseText);
            }
        }
        xhttp.send(params);
    }
}


var Hero = function(canvas_parent, position, game_panel) {

    var self = this;
    self.position = position;
    positions[position.x - 1][position.y - 1] = 1;

    var inner_canvas = document.createElement("canvas");
    canvas_parent.appendChild(inner_canvas);
    var ctx_inner = inner_canvas.getContext("2d");
    var width = window.innerWidth;
    var height = window.innerHeight;

    var aaa = game_panel.width / 21;
    var bbb = game_panel.height / 21;

    this.x = game_panel.x + (position.x - 1) * aaa;
    this.y = game_panel.y + (position.y - 1) * bbb;

    inner_canvas.width = width;
    inner_canvas.height = height;

    ctx_inner.rect(this.x, this.y, aaa, bbb);
    ctx_inner.fillStyle = 'green';
    ctx_inner.fillRect(this.x, this.y, aaa, bbb);

    ctx_inner.stroke();

    this.moveRight = function() {
        if (positions[position.x][position.y - 1] !== undefined && positions[position.x][position.y - 1] == 0) {
            if (Math.round(this.x) < Math.round(game_panel.x + game_panel.width - aaa)) {
                ctx_inner.clearRect(0, 0, inner_canvas.width, inner_canvas.height);
                ctx_inner.beginPath();
                this.x = this.x + aaa;
                ctx_inner.rect(this.x, this.y, aaa, bbb);
                ctx_inner.fillStyle = 'green';
                ctx_inner.fillRect(this.x, this.y, aaa, bbb);
                ctx_inner.stroke();
                positions[position.x - 1][position.y - 1] = 0;
                position.x += 1;
                positions[position.x - 1][position.y - 1] = 1;
            }

        }
    }

    this.moveLeft = function() {
        if (positions[position.x - 2][position.y - 1] !== undefined && positions[position.x - 2][position.y - 1] == 0) {
            if (Math.round(this.x) > Math.round(game_panel.x)) {
                ctx_inner.clearRect(0, 0, inner_canvas.width, inner_canvas.height);
                ctx_inner.beginPath();
                this.x = this.x - aaa;
                ctx_inner.rect(this.x, this.y, aaa, bbb);
                ctx_inner.fillStyle = 'green';
                ctx_inner.fillRect(this.x, this.y, aaa, bbb);
                ctx_inner.stroke();
                positions[position.x - 1][position.y - 1] = 0;
                position.x -= 1;
                positions[position.x - 1][position.y - 1] = 1;
            }
        }
    }

    this.moveUp = function() {
        if (positions[position.x - 1][position.y - 2] !== undefined && positions[position.x - 1][position.y - 2] == 0) {
            if (Math.round(this.y) > Math.round(game_panel.y)) {
                ctx_inner.clearRect(0, 0, inner_canvas.width, inner_canvas.height);
                ctx_inner.beginPath();
                this.y = this.y - bbb;
                ctx_inner.rect(this.x, this.y, aaa, bbb);
                ctx_inner.fillStyle = 'green';
                ctx_inner.fillRect(this.x, this.y, aaa, bbb);
                ctx_inner.stroke();
                positions[position.x - 1][position.y - 1] = 0;
                position.y -= 1;
                positions[position.x - 1][position.y - 1] = 1;
            }
        }
    }

    this.moveDown = function() {
        if (positions[position.x - 1][position.y] !== undefined && positions[position.x - 1][position.y] == 0) {
            if (Math.round(this.y) < Math.round(game_panel.y + game_panel.height - bbb)) {
                ctx_inner.clearRect(0, 0, inner_canvas.width, inner_canvas.height);
                ctx_inner.beginPath();
                this.y = this.y + bbb;
                ctx_inner.rect(this.x, this.y, aaa, bbb);
                ctx_inner.fillStyle = 'green';
                ctx_inner.fillRect(this.x, this.y, aaa, bbb);
                ctx_inner.stroke();
                positions[position.x - 1][position.y - 1] = 0;
                position.y += 1;
                positions[position.x - 1][position.y - 1] = 1;
            }
        }
    }

    this.updatePosition = function() {

        var xhttp = new XMLHttpRequest();
        var params = JSON.stringify({
            'x': self.position.x,
            'y': self.position.y
        });

        xhttp.open("POST", "update_hero/", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //console.log(this.responseText);
            }
        }
        xhttp.send(params);
    }
}

window.onload = function() {
    create_game_panel();
}

window.onresize = function() {
    create_game_panel();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function create_hero(canvas_parent, position, game_panel) {
    window.target_position = position;
    var hero = new Hero(canvas_parent, position, game_panel);
    document.addEventListener('keyup', function(event) {
        if (event.key == 'ArrowRight') {
            hero.moveRight();
            hero.updatePosition();
        } else if (event.key == 'ArrowLeft') {
            hero.moveLeft();
            hero.updatePosition();
        } else if (event.key == 'ArrowUp') {
            hero.moveUp();
            hero.updatePosition();
        } else if (event.key == 'ArrowDown') {
            hero.moveDown();
            hero.updatePosition();
        }

    });
    return hero;
}

async function create_enemy(id, canvas_parent, game_panel, position) {
    var enemy = new Enemy(id, canvas_parent, game_panel, position);
    return enemy;
}

async function create_game_panel() {
    var game_panel = new GamePanel();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response_js = JSON.parse(this.responseText);
            position_x = response_js.x;
            position_y = response_js.y;

            create_hero(game_panel['canvas_parent'], new Position(position_x, position_y), game_panel);
            create_enemies(game_panel['canvas_parent'], game_panel);
        }
    };
    xhttp.open("GET", "get_hero", true);
    xhttp.send();

}


async function create_enemies(canvas_parent, game_panel) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            enemies = response['enemies'];
            create_enemies_(enemies, canvas_parent, game_panel);
        }
    };
    xhttp.open("GET", "get_enemies/", true);
    xhttp.send();
}

async function create_enemies_(enemies, canvas_parent, game_panel) {

    for (step = 0; step < enemies.length; step++) {
        await sleep(0);
        create_enemy(step, canvas_parent, game_panel, new Position(enemies[step]['x'], enemies[step]['y']));
    }
    for (step = enemies.length; step < 10; step++) {
        await sleep(1000);
        enemy = create_enemy(step, canvas_parent, game_panel);


    }
}