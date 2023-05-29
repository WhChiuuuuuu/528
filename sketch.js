let points =[[1,0],[1,1],[5,1],[5,2],[4,2],[4,-3],[5,-3],[5,-2],[6,-2],[6,-1],[8,-1],[8,-2],[9,-2],[9,-3],[10,-3],[10,-8],[11,-8],[11,-9],[13,-9],[13,-10],[10,-10],[10,-9],[9,-9],[9,-8],[8,-8],[8,-6],[7,-6],[7,-9],[8,-9],[8,-10],[3,-10],[3,-9],[5,-9],[5,-8],[6,-8],[6,-7],[4,-7],[4,-5],[2,-5],[2,-6],[1,-6],[1,-4],[2,-4],[2,-1],[0,-1],[0,0]]
var fill_colors = "ede0d4-e6ccb2-ddb892-b08968-7f5539-9c6644".split("-").map(a=>"#"+a)
var stroke_colors = "ccd5ae-e9edc9-fefae0-faedcd-d4a373".split("-").map(a=>"#"+a)

// //粒子，類別
// class obj{ //物件的設定
//   constructor(args){  //預設值，基本資料(包含物件的顏色，位置，速度，大小)
//     // this.p = args.p || {x: random(width),y: random(height)} //一個物件開始的位置
//     this.p = args.p || createVector(random(width),random(height))
//     // this.v = {x: random(-1,1),y: random(-1,1)} //速度，X，Y移動的速度為亂數產生(-1,1)之間的數字
//     this.v = createVector(random(-1,1),random(-1,1)) //產生一個X軸座標值為random(-1,1)，y軸座標值random(-1,1)
//     this.size = random(2,4)
//     this.color = random(fill_colors)
//     this.stroke = random(stroke_colors)
//   }
//   draw()  //把物件畫出來的函數
//   {
//     push()//重新設定新的原點與顏色設定
//       translate(this.p.x,this.p.y)//原點設定在物件所在位置
//       scale((this.v.x<0?1:-1),-1)//放大縮小的指令，this.v.x<0條件成立，值為1，否則為-1
//       fill(this.color)
//       stroke(this.stroke)
//       strokeWeight(2)
//         beginShape()
//           for(var i=0;i<points.length-1;i++){
//             //line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
//             curveVertex(points[i][0]*this.size,points[i][1]*this.size)
//           }
//         endShape(CLOSE)
//     pop()
//   }

//   update(){
//     //移動
//     this.p.x = this.p.x + this.v.x
//     this.p.y = this.p.y + this.v.y
  
//     //碰壁
//     if(this.p.x <= 0 || this.p.x >= width) //<0為碰到左邊，>width為碰到右邊
//     {
//      this.v.x = -this.v.x 
//     }
//     if(this.p.y <= 0 || this.p.y >= height) //<0為碰到下面，>height為碰到上面
//     {
//       this.v.y = -this.v.y
//     }
//   }
//   isBallInRanger(){ //判斷有沒有被滑鼠按到 
//    let d = dist(mouseX,mouseY,this.p.x,this.p.y) //計算滑鼠按下的點與此物件位置之間的距離
//    if(d<this.size*10){ // 10的由來:去看作標點最大的值，以此作為方框的高與寬
//     return true } //代表距離有在範圍內
//    else {
//     return false //代表距離沒有在範圍內
//    }
//   }
// }

var ball //代表單一個物件，利用這個物件來做正在處理的物件
var balls = [] //陣列，放所有的物件資料
var bullet = []
var bullets = []
var score = 0
function setup() {
  createCanvas(windowWidth, windowHeight);
  //產生幾個物件
  for(var j=0;j<20;j=j+1){
    ball = new obj({}) //產生一個新的物件，暫時放入到ball變數中
    balls.push(ball) //把ball物件放入到balls物件群(陣列)中
  }
}
//產生一筆飛彈資料
function draw() {
  background(255);
  for(let ball of balls){ 
    ball.draw()
    ball.update()
    //判斷每隻袋鼠有沒有接觸每一個飛彈
    for(let bullet of bullets){
      if (ball.isBallInRanger(bullet.p.x,bullet.p.y)) //判斷ball和bullet有沒有碰到
      {
        score = score + 1  // 分數+1
        balls.splice(balls.indexOf(ball),1) //讓袋鼠從袋鼠倉庫內移除
        bullets.splice(balls.indexOf(bullet),1) //讓飛彈從飛彈倉庫內移除
      }
    }
  }

  for(let bullet of bullets){ 
    bullet.draw()
    bullet.update() 
  }
  
  textSize(25)
  text(score,50,50)

  //畫出砲台
  push()
    let dx = mouseX-width/2 //滑鼠座標到中心點座標的X軸距離
    let dy = mouseY-height/2 // 滑鼠座標到中心點座標的X軸距離
    let angle = atan2(dy,dx)  // 利用反tan算出角度

   translate(width/2,height/2)
   rotate(angle) //讓三角形翻轉一個angle角度
   fill("#4f772d")
   noStroke()
   ellipse(0,10,35) //砲台的圓形
   fill("#e5989b")
   triangle(0,-30,-15,15,15,15) //砲台三角形
  pop()
}

function mousePressed(){

  // for(let ball of balls){
  //   if(ball.isBallInRanger(mouseX,mouseY)){ //把倉庫的這個物件刪除
  //     score = score + 1
  //     balls.splice(balls.indexOf(ball),1) //把倉庫內編號第幾個刪除，只刪除1個(indexOf()找出ball的編號)
  //   }
  // }

  bullet = new Bullet({})
  bullets.push(bullet) 
}

  

