var ball;
var database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database()//initilised firebase real time database
    var ballPosition = database.ref("ball/position")
    ballPosition.on("value",readPosition,showError)
}
function readPosition(data){
var pos = data.val()
var x = pos.x
console.log(x)
var y = pos.y
console.log(y)
ball.x = pos.x
ball.y = pos.y
}
function showError(){

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
    writePosition(ball.x,ball.y);
}
function writePosition(xx,yy){
    var ballPosition = database.ref("ball/position")
    ballPosition.set({
        "x":xx,
        "y":yy
    })
}
