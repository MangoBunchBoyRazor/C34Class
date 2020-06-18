var ball, database, ref, positionData;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //Alias for firebase.database()
    database = firebase.database();

    ref = database.ref("Ball/position");
    ref.on('value',getData,errData);
}
function getData(data){
    positionData = data;
}
function errData(err){
    console.log(err);
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
    ball.x = positionData.val().x;
    ball.y = positionData.val().y;
    drawSprites();
}

function changePosition(x,y){
    let ballpos = positionData.val();
    /*ball.x = ball.x + x;
    ball.y = ball.y + y;*/
    //console.log(ballpos,x,y);
    ref.set({
        x:ballpos.x+x,
        y:ballpos.y+y
    });
}
