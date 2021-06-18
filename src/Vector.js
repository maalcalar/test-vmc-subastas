module.exports = class Vector {
    constructor() {
        this.X = 0
        this.Y = 0
        this.D = "N" // N: Norte, S: Sur, O: Oeste, E: Este
    }

    get getState() {
        return {
            X: this.X,
            Y: this.Y,
            D: this.D
        }
    }

    get getPosition() {
        return {
            X: this.X,
            Y: this.Y
        }
    }

    get getDirection() {
        return {
            D: this.D
        }
    }

    moveForward() {
        switch (this.D) {
            case "N":
                this.Y++
                break
            case "S":
                this.Y--
                break
            case "O":
                this.X--
                break
            case "E":
                this.X++
                break
            default:
                break
        }
    }

    turnRight() {
        switch (this.D) {
            case "N":
                this.D = "E"
                break
            case "S":
                this.D = "O"
                break
            case "O":
                this.D = "N"
                break
            case "E":
                this.D = "S"
                break
            default:
                break
        }
    }

    turnLeft() {
        switch (this.D) {
            case "N":
                this.D = "O"
                break
            case "S":
                this.D = "E"
                break
            case "O":
                this.D = "S"
                break
            case "E":
                this.D = "N"
                break
            default:
                break
        }
    }
} 