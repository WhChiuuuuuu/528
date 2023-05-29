 class Bullet{
     constructor(args){  
        this.r = args.r || 10   //如果飛彈有傳回直徑的大小，就以參數為直徑，否則預設為10
         this.p = args.p || createVector(width/2,height/2)  //飛彈起始的位置(以向量方式表示該座標)，所以座標為(width/2,height/2)
       this.v = args.v || createVector(1,1)  //飛彈的數度
         this.color = args.color || "#6c757d"  //飛彈顏色
     }
     draw(){  //畫圓
       push()
          translate(this.p.x,this.p.y)
          fill(this.color)
          noStroke
          ellipse(0,0,this.r)
       pop()     }
     update(){ //計算移動後速率
       this.p.add(this.v)     
      
    }
 }