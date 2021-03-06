function Player(_col,_row,_type){
    this.col = _col;
    this.row = _row;
    this.dir = 0;
    this.type = _type;
    this.attackDmg = 1;
    this.health = 3;
    this.swinging = false;
    this.target = {};
        this.target.col;
        this.target.row;
    this.setTarget();
    this.moved = false;
    this.score = 0;
}

Player.prototype.update = function(){
    
    if(this.swinging){
        console.log('swinging');
        this.setTarget();
        this.attack();
    }
    if(frameCount%5==0){
        if(this.moved){
            this.moved = false;
        }else{
            if (keyIsDown(68)) {//d
                if(this.dir == 0){
                    this.move();
                }else{
                    this.dir = 0;
                }
            }else if (keyIsDown(83)) {//s
                if(this.dir == 1){
                    this.move();
                }else{
                    this.dir = 1;
                }
            }else if (keyIsDown(65)) {//a
                if(this.dir == 2){
                    this.move();
                }else{
                    this.dir = 2;
                }
            }else if (keyIsDown(87)) {//w
                if(this.dir == 3){
                    this.move();
                }else{
                    this.dir = 3;
                }
            }
        }
    }
}

Player.prototype.setTarget = function(){
    
    let maxCols = (width / GRID_SIZE)-1;
    let maxRows = (height / GRID_SIZE)-1;

    let targetCol;
    let targetRow;
    switch(this.dir){
        case 0:
            if(this.col == maxCols){break;}
            targetCol = this.col+1;
            targetRow = this.row;
            break;
        case 1:
            if(this.row == maxRows){break;}
            targetCol = this.col;
            targetRow = this.row+1;
            break;
        case 2:
            if(this.col == 0){break}
            targetCol = this.col-1;
            targetRow = this.row;
            break;
        case 3:
            if(this.row == 0){break;}
            targetCol = this.col;
            targetRow = this.row-1;
            break;
    }
    if(targetCol!=undefined){
        this.target.col = targetCol;
    }else{this.target.col = -1}
    if(targetRow!=undefined){
        this.target.row = targetRow;
    }else{this.target.row = -1}
}

Player.prototype.render = function(){
    let x = this.col * GRID_SIZE;
    let y = this.row * GRID_SIZE;
    let half = GRID_SIZE/2;
    let small = GRID_SIZE*0.75;
    let smaller = GRID_SIZE/8;
    push();
        translate(x+half,y+half);
        rotate(HALF_PI*this.dir);
        fill(200);
        ellipseMode(CENTER);
        ellipse(-smaller/2,0,GRID_SIZE-smaller,GRID_SIZE);
        rectMode(CORNER);
        rect(half-smaller,-half,smaller,small);
        if(this.swinging){
            rect(0,half-smaller,GRID_SIZE,smaller);
        }
            
    pop();
}
Player.prototype.attack = function(){
    if(grid.getType(this.target.col,this.target.row) == "ENEMY"){
        grid.objects[this.target.col][this.target.row].damage(this.attackDmg);
    }
}
Player.prototype.damage = function(dmgDealt){
    console.log()
    this.health -= dmgDealt;
    
}
Player.prototype.heal = function(){
    this.health++;
}
Player.prototype.die = function(){
    if(this.health <= 0){
        running = false;
    }
}
Player.prototype.move = function(){
    this.setTarget();
    grid.move(this.col,this.row,this.target.col,this.target.row);
    this.moved = true;
}