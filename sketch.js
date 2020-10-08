//Create variables here
var dog, happyDog;
var dogSprite
var database;
var localFoodCnt, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

function preload(){
  //load images here
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  food = new Food(50,250,10,10);

  var config = {
    apiKey: "AIzaSyA5LGtnkDLTJkFsNyjMHST_MtlU9pLROIU",
    authDomain: "virtual-pet-e63a7.firebaseapp.com",
    databaseURL: "https://virtual-pet-e63a7.firebaseio.com",
    projectId: "virtual-pet-e63a7",
    storageBucket: "virtual-pet-e63a7.appspot.com",
    messagingSenderId: "128263651741",
    appId: "1:128263651741:web:4b21ebf73cca942d10ef74"
  }

  feed = createButton("Feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);
 
  addFood = createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFoodDog);

  firebase.initializeApp(config);
  database = firebase.database();
  createCanvas(500, 500);

  dogSprite = createSprite(420,250);
  dogSprite.addImage(dog, "dog.png");
  dogSprite.scale = 0.2;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}

function draw(){  
  background(46, 139, 87);

 fedTime = database.ref('FeedTime');
 fedTime.on("value", function(data){
    lastFed = data.val();
  });

fill(255,255,254);
textSize(15);
if(lastFed >= 12){
  text("Last Feed :" + lastFed % 12 + "PM", 350,30);
}else if (lastFed == 0){
  text(" Last Feed : 12 AM")
}else{
  text(" Last Feed : " + lastFed + "AM", 350,30);
}

  food.display();
  drawSprites();
}

function feedDog(){
  dogSprite.addImage(happyDog, "happydog.png");

  food.updateFoodStock(food.getFoodStock() - 1);
  database.ref('/').update({
    foodS:food.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoodDog(){
  localFoodCnt = food.getFoodStock();
  localFoodCnt ++ ;
  database.ref('/').update({
    foodS:localFoodCnt
  })
  food.updateFoodStock(localFoodCnt);
}

function readStock(data) {
  foodS = data.val()
}

function writeStock(x) {
  database.ref('/').update({
    foodS:x
  })

  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
}
