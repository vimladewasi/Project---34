//Create variables here
var dog, happyDog,foodS, foodStock,dog_img,happydog_img; 
var database;


function preload()
{
  //load images here
    dog_img =loadImage("images/dogImg.png");
    happydog_img =loadImage("images/dogImg1.png");
}

function setup() {
 createCanvas(500, 500);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(250,250,30,40);
  dog.addImage(dog_img);
  dog.scale = 0.2;

}


function draw() {  
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog_img);
  }

  //readStock();
  //writeStock();

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke(5);
  text("Note: Press UP Arrow To Feed Dog Milk",100,30);
  text("You have: " + foodS + " Milk Bottle left", 150, 70);
  console.log(foodS);

} 

// function to read values from DB
function readStock(data){
  foodS = data.val();
}

// function to write value in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x,
  })
}



