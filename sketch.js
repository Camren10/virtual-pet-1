var dogImg1,dogImg2;
var database;
var dog;
var food;

function preload()
{
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 800);
  database = firebase.database();
  
  dog = createSprite(400,450);
  dog.addImage(dogImg1)
  dog.scale=0.5

  var foodStockRef=database.ref('foodStock');
  foodStockRef.on("value",(data)=>{
    food=data.val();
  });
}


function draw() {  
  background("green");
  if(food!==undefined) {
    fill("black")
    textSize(16);
    text("food remaining: "+food,350,50);
  }

  drawSprites();
}

function keyPressed() {
  if(keyCode===UP_ARROW) {
    dog.addImage(dogImg2);
    if(food<=0) {
      food=0
    }
    else {
      food=food-1
    }
    database.ref('/').update({
      foodStock:food
    });
  }
}

