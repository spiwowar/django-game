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

    this.width = width/2;
    this.height = height/2;
    this.x = width/2-width/4;
    this.y = height/2-height/4;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
}

var Position = function(x, y){
    this.x = x;
    this.y = y;
}

function create_positions(rows, columns) {
  var arr = [];

  for (var i=0;i<rows;i++) {
      arr[i] = [];
     for (var j=0;j<columns;j++){
        arr[i][j] = 0;
     }
  }
  return arr;
}

var positions = create_positions(21, 21);

var Enemy = function(canvas_parent, game_panel){

    var self = this;
    self.enemy_position = null;
    var horizontal_or_vertical = Math.floor(Math.random() * 2);

    var horizontal = Math.floor(Math.random() * 2);
    var vertical = Math.floor(Math.random() * 2);
    var frac = Math.floor(Math.random() * 21);

    var aaa = game_panel.width/21;
    var bbb = game_panel.height/21;

    if (horizontal_or_vertical == 0){
        if (horizontal == 0){
            self.x = game_panel.x;
        }
        else if (horizontal == 1){
            self.x = game_panel.x + game_panel.width - aaa;
        }
        self.y = game_panel.y + bbb*frac;
        self.enemy_position = new Position(Math.round((self.x-game_panel.x)/aaa)+1, Math.round((self.y-game_panel.y)/bbb)+1);
    }

    else if (horizontal_or_vertical == 1){
        if (vertical == 0){
            self.y = game_panel.y;
        }
        else if (vertical == 1){
            self.y = game_panel.y + game_panel.height - bbb;
        }
        self.x = game_panel.x + aaa*frac;
        self.enemy_position = new Position(Math.round((self.x-game_panel.x)/aaa)+1, Math.round((self.y-game_panel.y)/bbb)+1);
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

    async function move(){
        while (true){
            await sleep(200);
            approach_to_target();
        }
    }
    move();

    async function approach_to_target(){
        if (target_position.x < self.enemy_position.x){
            moveLeft();
        }
        else if (target_position.x > self.enemy_position.x){
            moveRight();
        }
        else if(target_position.y < self.enemy_position.y){
            moveUp();
        }
        else if(target_position.y > self.enemy_position.y){
            moveDown();
        }
    }

    function moveRight(){
        if (positions[self.enemy_position.x+1][self.enemy_position.y] !== undefined && positions[self.enemy_position.x+1][self.enemy_position.y] == 0){
        ctx_inner.clearRect(0,0,inner_canvas.width, inner_canvas.height);
        ctx_inner.beginPath();
        self.x = self.x + aaa;
        ctx_inner.rect(self.x, self.y, aaa, bbb);
        ctx_inner.fillStyle = 'red';
        ctx_inner.fillRect(self.x, self.y, aaa, bbb);
        ctx_inner.stroke();
        positions[self.enemy_position.x-1][self.enemy_position.y-1] = 0;
        self.enemy_position.x += 1;
        positions[self.enemy_position.x-1][self.enemy_position.y-1] = 1;
        }
    }

    function moveLeft(){
        if (positions[self.enemy_position.x-1][self.enemy_position.y] !== undefined && positions[self.enemy_position.x-1][self.enemy_position.y] == 0){

        ctx_inner.clearRect(0,0,inner_canvas.width, inner_canvas.height);
        ctx_inner.beginPath();
        self.x = self.x - aaa;
        ctx_inner.rect(self.x, self.y, aaa, bbb);
        ctx_inner.fillStyle = 'red';
        ctx_inner.fillRect(self.x, self.y, aaa, bbb);
        ctx_inner.stroke();
        positions[self.enemy_position.x-1][self.enemy_position.y-1] = 0;
        self.enemy_position.x -= 1;
        positions[self.enemy_position.x-1][self.enemy_position.y-1] = 1;
        }

    }

    function moveUp(){
        if (positions[self.enemy_position.x-1][self.enemy_position.y] !== undefined && positions[self.enemy_position.x-1][self.enemy_position.y] == 0){

        ctx_inner.clearRect(0,0,inner_canvas.width, inner_canvas.height);
        ctx_inner.beginPath();
        self.y = self.y - bbb;
        ctx_inner.rect(self.x, self.y, aaa, bbb);
        ctx_inner.fillStyle = 'red';
        ctx_inner.fillRect(self.x, self.y, aaa, bbb);
        ctx_inner.stroke();
        positions[self.enemy_position.x-1][self.enemy_position.y-1] = 0;
        self.enemy_position.y -= 1;
        positions[self.enemy_position.x-1][self.enemy_position.y-1] = 1;
        }

    }

    function moveDown(){
    if (positions[self.enemy_position.x][self.enemy_position.y+1] !== undefined && positions[self.enemy_position.x][self.enemy_position.y+1] == 0){

        ctx_inner.clearRect(0,0,inner_canvas.width, inner_canvas.height);
        ctx_inner.beginPath();
        self.y = self.y + bbb;
        ctx_inner.rect(self.x, self.y, aaa, bbb);
        ctx_inner.fillStyle = 'red';
        ctx_inner.fillRect(self.x, self.y, aaa, bbb);
        ctx_inner.stroke();
        positions[self.enemy_position.x-1][self.enemy_position.y-1] = 0;
        self.enemy_position.y += 1;
        positions[self.enemy_position.x-1][self.enemy_position.y-1] = 1;
        }

    }
}


var target_position = new Position(11, 11);

var Hero = function(canvas_parent, position, game_panel) {

    positions[position.x][position.y] = 1;

    var inner_canvas = document.createElement("canvas");
    canvas_parent.appendChild(inner_canvas);
    var ctx_inner = inner_canvas.getContext("2d");
    var width = window.innerWidth;
    var height = window.innerHeight;

    var aaa = game_panel.width/21;
    var bbb = game_panel.height/21;

    this.x = game_panel.x + (position.x-1)*aaa;
    this.y = game_panel.y + (position.y-1)*bbb;

    inner_canvas.width = width;
    inner_canvas.height = height;

    ctx_inner.rect(this.x, this.y, aaa, bbb);
    ctx_inner.fillStyle = 'green';
    ctx_inner.fillRect(this.x, this.y, aaa, bbb);

    ctx_inner.stroke();

    this.moveRight = function(){
        if (positions[position.x+1][position.y] !== undefined && positions[position.x+1][position.y] == 0){
        if (Math.round(this.x) < Math.round(game_panel.x + game_panel.width - aaa)){
            ctx_inner.clearRect(0,0,inner_canvas.width, inner_canvas.height);
            ctx_inner.beginPath();
            this.x = this.x + aaa;
            ctx_inner.rect(this.x, this.y, aaa, bbb);
            ctx_inner.fillStyle = 'green';
            ctx_inner.fillRect(this.x, this.y, aaa, bbb);
            ctx_inner.stroke();
            positions[position.x][position.y] = 0;
            position.x += 1;
            positions[position.x][position.y] = 1;
            }

        }
    }

    this.moveLeft = function(){
        if (positions[position.x-1][position.y] !== undefined && positions[position.x-1][position.y] == 0){
        if (Math.round(this.x) > Math.round(game_panel.x)){
            ctx_inner.clearRect(0,0,inner_canvas.width, inner_canvas.height);
            ctx_inner.beginPath();
            this.x = this.x - aaa;
            ctx_inner.rect(this.x, this.y, aaa, bbb);
            ctx_inner.fillStyle = 'green';
            ctx_inner.fillRect(this.x, this.y, aaa, bbb);
            ctx_inner.stroke();
            positions[position.x][position.y] = 0;
            position.x -= 1;
            positions[position.x][position.y] = 1;
            }
        }
    }

    this.moveUp = function(){
        if (positions[position.x][position.y-1] !== undefined && positions[position.x][position.y-1] == 0){
        if (Math.round(this.y) > Math.round(game_panel.y)){
            ctx_inner.clearRect(0,0,inner_canvas.width, inner_canvas.height);
            ctx_inner.beginPath();
            this.y = this.y - bbb;
            ctx_inner.rect(this.x, this.y, aaa, bbb);
            ctx_inner.fillStyle = 'green';
            ctx_inner.fillRect(this.x, this.y, aaa, bbb);
            ctx_inner.stroke();
            positions[position.x][position.y] = 0;
            position.y -= 1;
            positions[position.x][position.y] = 1;
            }
        }
    }

    this.moveDown = function(){
        if (positions[position.x][position.y+1] !== undefined && positions[position.x][position.y+1] == 0){
        if (Math.round(this.y) < Math.round(game_panel.y + game_panel.height - bbb)){
            ctx_inner.clearRect(0,0,inner_canvas.width, inner_canvas.height);
            ctx_inner.beginPath();
            this.y = this.y + bbb;
            ctx_inner.rect(this.x, this.y, aaa, bbb);
            ctx_inner.fillStyle = 'green';
            ctx_inner.fillRect(this.x, this.y, aaa, bbb);
            ctx_inner.stroke();
            positions[position.x][position.y] = 0;
            position.y += 1;
            positions[position.x][position.y] = 1;
            }
        }
    }
}

window.onload = function(){
    create_game_panel();
}

window.onresize = function(){
    create_game_panel();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function create_hero(canvas_parent, position, game_panel){
    var hero = new Hero(canvas_parent, position, game_panel);
    document.addEventListener('keyup', function (event) {
    if (event.key == 'ArrowRight'){
        hero.moveRight();
    }
    else if (event.key == 'ArrowLeft'){
        hero.moveLeft();
    }
    else if (event.key == 'ArrowUp'){
        hero.moveUp();
    }
    else if (event.key == 'ArrowDown'){
        hero.moveDown();
    }
    });
    return hero;
}

async function create_enemy(canvas_parent, game_panel){
    var enemy = new Enemy(canvas_parent, game_panel);
}

async function create_game_panel() {
    var game_panel = new GamePanel();
    create_hero(game_panel['canvas_parent'], target_position, game_panel);
    for (step = 0; step < 10; step++) {
        await sleep(1000);
        create_enemy(game_panel['canvas_parent'], game_panel);
    }
}
