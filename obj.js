//粒子，類別
class obj{ //物件的設定
    constructor(args){  //預設值，基本資料(包含物件的顏色，位置，速度，大小)
      // this.p = args.p || {x: random(width),y: random(height)} //一個物件開始的位置
      this.p = args.p || createVector(random(width),random(height))
      // this.v = {x: random(-1,1),y: random(-1,1)} //速度，X，Y移動的速度為亂數產生(-1,1)之間的數字
      this.v = createVector(random(-1,1),random(-1,1)) //產生一個X軸座標值為random(-1,1)，y軸座標值random(-1,1)
      this.size = random(2,4)
      this.color = random(fill_colors)
      this.stroke = random(stroke_colors)
    }
    draw()  //把物件畫出來的函數
    {
      push()//重新設定新的原點與顏色設定
        translate(this.p.x,this.p.y)//原點設定在物件所在位置
        scale((this.v.x<0?1:-1),-1)//放大縮小的指令，this.v.x<0條件成立，值為1，否則為-1
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(2)
          beginShape()
            for(var i=0;i<points.length-1;i++){
              //line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
              curveVertex(points[i][0]*this.size,points[i][1]*this.size)
            }
          endShape(CLOSE)
      pop()
    }
  
    update(){
      //移動
      this.p.x = this.p.x + this.v.x
      this.p.y = this.p.y + this.v.y
    
      //碰壁
      if(this.p.x <= 0 || this.p.x >= width) //<0為碰到左邊，>width為碰到右邊
      {
       this.v.x = -this.v.x 
      }
      if(this.p.y <= 0 || this.p.y >= height) //<0為碰到下面，>height為碰到上面
      {
        this.v.y = -this.v.y
      }
    }
    isBallInRanger(x,y){ //判斷有沒有被滑鼠按到 
     let d = dist(x,y,this.p.x,this.p.y) //計算滑鼠按下的點與此物件位置之間的距離
     if(d<this.size*10){ // 10的由來:去看作標點最大的值，以此作為方框的高與寬
      return true } //代表距離有在範圍內
     else {
      return false //代表距離沒有在範圍內
     }
    }
  }