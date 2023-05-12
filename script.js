let matrix = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0],
    [0, 0, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 3, 0, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 3, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 2, 1, 1, 3, 2, 3, 0, 3, 1, 1, 1, 0, 1, 0, 0],
    [1, 1, 1, 2, 1, 1, 0, 2, 3, 0, 3, 2, 1, 0, 1, 1, 1, 0],
    [0, 3, 0, 1, 3, 0, 1, 1, 3, 1, 3, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 2, 1, 1, 4, 2, 0, 0, 3, 2, 1, 1, 1, 1, 1, 0],
    [0, 3, 0, 2, 1, 1, 4, 2, 0, 2, 0, 2, 1, 1, 1, 1, 1, 0],
    [0, 3, 0, 2, 1, 1, 4, 0, 0, 0, 0, 1, 0, 3, 3, 2, 0, 0],
    [0, 3, 0, 2, 1, 1, 4, 2, 3, 0, 0, 0, 1, 1, 1, 2, 1, 0],
    [1, 0, 3, 2, 1, 1, 3, 2, 3, 0, 0, 1, 0, 1, 3, 2, 1, 0],
    [0, 0, 4, 2, 2, 0, 1, 0, 3, 2, 0, 4, 0, 0, 3, 2, 0, 0],
    [0, 0, 4, 2, 2, 0, 0, 0, 2, 2, 0, 4, 0, 0, 1, 2, 0, 0],
    [0, 0, 4, 1, 2, 0, 0, 3, 2, 2, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 2, 0, 0, 0, 2, 2, 0, 4, 0, 0, 0, 3, 0, 0],
  ];
  
 let side = 20;
 let grassArr = []
 let grassEaterArr = []
 let predatorArr = []
 let omnivoreArr = []
 function draw() {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x*side, y*side, side, side)
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x*side, y*side, side, side)
            }
            else if(matrix[y][x] == 2){
                fill('yellow')
                rect(x*side, y*side, side, side)
            }
            else if(matrix[y][x] == 3){
                fill('orange')
                rect(x*side, y*side, side, side)
            }
            else if(matrix[y][x] == 4){
                fill('blue')
                rect(x*side, y*side, side, side)
            }   
        }
    }
         for(let i in grassEaterArr){
            grassEaterArr[i].mult()
            if(grassEaterArr[i].energy==0){
                matrix[grassEaterArr[i].y][grassEaterArr[i].x] = 0
                grassEaterArr.splice(i, 1)
            }
            else{
                if(grassEaterArr[i].eat() == true){
                    grassEaterArr.splice(i, 1)
                }
                else if(grassEaterArr[i].move() == true){
                    grassEaterArr.splice(i, 1)
                } 
            }
         }
         for(let i in predatorArr){
            predatorArr[i].mult()
            if(predatorArr[i].energy==0){
                matrix[predatorArr[i].y][predatorArr[i].x] = 0
                predatorArr.splice(i, 1)
            }
            else{
                if(predatorArr[i].eat() == true){
                    predatorArr.splice(i, 1)
                }
                else if(predatorArr[i].move() == true){
                    predatorArr.splice(i, 1)
                } 
            }
         }
         for(let i in omnivoreArr){
            omnivoreArr[i].mult()
            if(omnivoreArr[i].energy==0){
                matrix[omnivoreArr[i].y][omnivoreArr[i].x] = 0
                omnivoreArr.splice(i, 1)
            }
            else{
                if(omnivoreArr[i].eat() == true){
                    omnivoreArr.splice(i, 1)
                }
                else if(omnivoreArr[i].move() == true){
                    omnivoreArr.splice(i, 1)
                } 
            }
         }
         for(var i in grassArr){
            grassArr[i].mul()
         }
         
         
 }

 function setup() {   
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
           if(matrix[y][x]==1){
               let gr1 = new Grass(x,y)
               grassArr.push(gr1)
            }
           else if(matrix[y][x] == 2){
               let grEat1 = new GrassEater(x,y, 8)
               grassEaterArr.push(grEat1)
            }
            else if(matrix[y][x] == 3){
                let pred1 = new Predator(x,y, 8)
                predatorArr.push(pred1)
             }
             else if(matrix[y][x] == 4){
                let omni1 = new Omnivore(x,y, 8)
                omnivoreArr.push(omni1)
             }
        }
    }
 }