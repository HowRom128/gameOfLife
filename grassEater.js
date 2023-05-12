class GrassEater extends LivingCreature{
    constructor(x,y,energy,index) {
        super(x, y, index)
        this.energy = energy;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    getNewCoordinates(){
            this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move(){
        this.getNewCoordinates()
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if(newCell && this.energy>=1){
            let newX = newCell[0];
            let newY = newCell[1];
            
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            this.x = newX
            this.y = newY
            this.energy--
            let newGrassEater = new GrassEater(newX, newY, this.energy, 2);
            grassEaterArr.push(newGrassEater);
            return true
        }else{
            return false
        }
    }
    eat(){
        this.getNewCoordinates()
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);
        if(newCell){
            let newX = newCell[0];
            let newY = newCell[1];
            
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            this.x = newX
            this.y = newY
            this.energy+=2
            let newGrassEater = new GrassEater(newX, newY, this.energy, 2);
            grassEaterArr.push(newGrassEater);
            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            return true
        }else{
            return false
        }
    }
    mult(){
        if(this.energy>=20){
            let emptyCells = this.chooseCell(1);
            let newCell = random(emptyCells);
            if(newCell){
                let newX = newCell[0];
                let newY = newCell[1];
            
                matrix[newY][newX] = 2;
                let newGrassEater = new GrassEater(newX, newY, 4, 2);
                grassEaterArr.push(newGrassEater);
            }
            this.energy = 10
        }
    }
}