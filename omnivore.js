class Omnivore{
    constructor(x,y,energy,index) {
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
        //privet
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
            matrix[newY][newX] = 4;
            this.x = newX
            this.y = newY
            this.energy--
            let newOmnivore = new Omnivore(newX, newY, this.energy, 4);
            predatorArr.push(newOmnivore);
            return true
        }else{
            return false
        }
    }
    eat(){
        this.getNewCoordinates()
        let emptyCells = [...this.chooseCell(1), ...this.chooseCell(2), ...this.chooseCell(3)]
        let newCell = random(emptyCells);
        if(newCell){
            let newX = newCell[0];
            let newY = newCell[1];
            
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;
            this.x = newX
            this.y = newY
            this.energy+=2
            let newOmnivore = new Omnivore(newX, newY, this.energy, 4);
            predatorArr.push(newOmnivore);
            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
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
            this.getNewCoordinates()
            let emptyCells = [...this.chooseCell(1), ...this.chooseCell(2), ...this.chooseCell(3)]
            let newCell = random(emptyCells);
            if(newCell){
                let newX = newCell[0];
                let newY = newCell[1];
            
                matrix[newY][newX] = 4;
                let newOmnivore = new Omnivore(newX, newY, 4, 4);
                omnivoreArr.push(newOmnivore);
            }
            this.energy = 10
        }
    }
}