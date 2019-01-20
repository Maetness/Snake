import { ElementRef } from '@angular/core';
import { GameOverService } from './gameover.service';

export class Game {
   
    public canvasWidth: number;
    public  canvasHeigth: number;
    public blockSize : number;
    
  
    public ctx;
    public delay : number;   //speed snake
  
    public snakee : Snake;
    public applee : Apple;
    public widthInBlocks : number;
    public heigthInBlocks : number;
  
    public score;
 
    public ourCanvas : any;
    
    // some
    private gameoverservice: GameOverService;
  
    constructor(gamebox: ElementRef, gameoverservice: GameOverService) { 
      this.canvasWidth = 300;
      this.canvasHeigth = 300;
      this.blockSize = 10;
      this.delay = 50;
      this.widthInBlocks = this.canvasWidth / this.blockSize;
      //la longueur d tout mon area
      this.heigthInBlocks = this.canvasHeigth / this.blockSize;
      this.snakee = new Snake([[4, 2], [3, 2], [2, 2], [1, 3]], "right");
      this.applee = new Apple([2, 2]);
      this.ourCanvas = gamebox;
      this.gameoverservice = gameoverservice;
      this.init();
    }
  
    init() {
        var  canvas = this.ourCanvas.nativeElement;
          canvas.width = this.canvasWidth;
          canvas.height = this.canvasHeigth;
          canvas.style.border = "30px solid gray";
          canvas.style.margin = "50px auto";
          canvas.style.display = "block";
          canvas.style.backgroundColor = "#ddd";  
  
          this.ctx = canvas.getContext('2d');
          
          this.score = 5;
          
          this.refreshCanvas();
      }
  
      refreshCanvas():void{
          this.snakee.advance(this.snakee.direction);          
          if (this.snakee.checkCollision(this)) {
              this.gameOver();
          }
          else {
  
              //
  
              if (this.snakee.isEatingApple(this.applee)) {
                  this.score++;
                  this.snakee.ateApple = true;
                  do {
                      this.applee.setNewPosition(this);
                  }
                  while (this.applee.isOnSnake(this.snakee));
              }
              this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigth);
              this.drawScore();
              this.snakee.draw(this.ctx,this);
              this.applee.draw(this.ctx, this.blockSize);//call function
 
              setTimeout(() => {
                 this.refreshCanvas();
             }, this.delay); 
          }
      }
      gameOver():void{
          this.ctx.save(); //save last parameter
  
          this.ctx.font = "bold 70px sans-serif";
          this.ctx.fillStyle = "#000"; 
  
          
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "middle";
          this.ctx.strokeStyle = "white"; 
          this.ctx.lineWidth = 5;
          var centreX = this.canvasWidth / 2;
          var centreY = this.canvasHeigth / 2;
  
          this.ctx.strokeText("GAME OVER", centreX, centreY - 180);
          this.ctx.fillText("GAME OVER", centreX, centreY - 180);
  
          this.ctx.font = "bold 30px sans-serif";
          this.ctx.strokeText("DRUECKEN SIE AUF SPACE UM WIEDERZUSPIELEN", centreX, centreY - 120);
          this.ctx.fillText("DRUECKEN SIE AUF SPACE UM WIEDERZUSPIELEN", centreX, centreY - 120);
  
          this.ctx.restore();//restore parameter at the end
  
          console.log("score", this.score);
 
          this.gameoverservice.callGameOver(this.score);

      }
  
      restart():void{
          this.snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4]], "right");
          this.score = 0;
          this.applee = new Apple([10, 10]);
          this.refreshCanvas();
  
      }
  
      drawScore():void{
          this.ctx.save();//save preview parameter
          this.ctx.font = "bold 20px sans-serif";
          this.ctx.fillText(this.score.toString(), 5, this.canvasHeigth - 5);
          this.ctx.restore();//update at end
  
      }
  
      drawBlock(ctx, position): void {
          var x = position[0] * this.blockSize;
          var y = position[1] * this.blockSize;
          ctx.fillRect(x, y, this.blockSize, this.blockSize);
      }
  
  
 
  
     
      public onKeydownHandler(e: KeyboardEvent) {
          var key = e.keyCode;
          //button controls for snake's direction
          var newDirection;
          switch (key) {
              case 37:        //code pr la touch left
                  newDirection = "left";
                  break;
              case 38:
                  newDirection = "up";
                  break;
              case 39:
                  newDirection = "right";
                  break;
              case 40:
                  newDirection = "down";
                  break;
  
              //Restart to play with space taste
              case 32:
                  this.restart(); 
                  return; 
  
              default:
                  return;
          }
          this.snakee.setDirection(newDirection);
      }
  
  
  
  };
  
  
  class Snake{
      body:number[][];
      direction:string;
      ateApple:boolean;
      constructor(body, direction){
          this.body = body;
          this.direction = direction;
          this.ateApple = false;
      }
  
      draw(ctx,game:Game):void{
          ctx.save();
          ctx.fillStyle = "#ff0000";
  
          for (var i = 0; i < this.body.length; i++) {
              game.drawBlock(ctx, this.body[i]);
          }
          ctx.restore;
      }
      
      public advance(direction:string):void{
          var nextPosi = this.body[0].slice();
              
  
          switch (this.direction) {
              case "left":
                  nextPosi[0] -= 1;
                      break;
                  case "right":
                      nextPosi[0] += 1;
                      break;
                  case "down":
                      nextPosi[1] += 1;
                      break;
                  case "up":
                      nextPosi[1] -= 1;
                      break;
                  default:
                      throw("Invalid Direction");
          }
  
  
          this.body.unshift(nextPosi);
          if (!this.ateApple) {
              this.body.pop(); //delete last element
          } else {
              this.ateApple = false;
          }   
  
      }
  
      setDirection(newDirection:string):void{
              var allowedDirections;
              switch (this.direction) {
                  case "left":
                  case "right":
                      allowedDirections = ["up", "down"];
                      break;
                  case "down":
                  case "up":
                      allowedDirections = ["left", "right"]
                      break;
  
                  default:
                      throw("Invalid Direction");
              }
              if (allowedDirections.indexOf(newDirection) > -1) {
                  this.direction = newDirection;
              }
  
      }
  
      checkCollision(game:Game):boolean{
              var wallCollision = false;
              var snakeCollision = false;
              var head = this.body[0];//head snake
              var rest = this.body.slice(1);
              //all snake's body without head
              var snakeX = head[0];
              var snakeY = head[1];
  
              var minX = 0;
              var minY = 0;
              var maxX = game.widthInBlocks - 1; //max X-Koordinaten plan
              var maxY = game.heigthInBlocks - 1; //max Ykoordinaten plan
  
              //check if snake goes outside
              var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
              var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
              if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                  wallCollision = true;
              }
  
              //check if snake eats itself
  
              for (var i = 0; i < rest.length; i++) {
                  if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                      snakeCollision = true;
                  }
              }
              return wallCollision || snakeCollision;
      }
  
      isEatingApple(appleToEat:Apple):boolean{
          var head = this.body[0];
          if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
              return true;
          } else {
              return false;
          }
      }
  
  }
  
  
  class Apple{
      position:number[];
  
      constructor(position:number[]){
          this.position = position;
      }
  
      draw(ctx,blockSize:number):void{
          ctx.save(); 
          ctx.fillStyle = "#33cc33";
          ctx.beginPath();
          var radius = blockSize / 2;
          var x = this.position[0] * blockSize + radius;
          var y = this.position[1] * blockSize + radius;
          ctx.arc(x, y, radius, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.restore;
      }
  
      setNewPosition(game:Game):void{
          var newX = Math.round(Math.random() * (game.widthInBlocks - 1));
          var newY = Math.round(Math.random() * (game.heigthInBlocks - 1));
          this.position = [newX, newY];
      }
  
      isOnSnake(snakeToCheck:Snake):boolean{
              var isOnSnake = false;
              for (var i = 0; i < snakeToCheck.body[i].length; i++) {
                  //
                  if (this.position[0] == snakeToCheck.body[i][0] &&
                      this.position[1] == snakeToCheck.body[i][1]) {
                      isOnSnake = true;
                  }
              }
              return isOnSnake;
      } 
      
  }
    