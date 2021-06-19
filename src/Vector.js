module.exports = class Vector {
    constructor(max = Infinity) {
        this.X = 0
        this.Y = 0
        this.D = "N" // N: Norte, S: Sur, O: Oeste, E: Este
        this.max = max
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

    get getReport() {
        const self = this
        if(this.X > this.max || this.Y > this.max) {
            return "Se superó el máximo de cuadras"
        } else {
            return `(${self.X}, ${self.Y}, ${self.D})`
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
        return this
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
        return this
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
        return this
    }

    processSequence(sequence) {
        const pasos = sequence.split("")

        pasos.forEach((paso) => {
            if (paso == "A") this.moveForward()
            else if(paso == "D") this.turnRight()
            else if(paso == "I") this.turnLeft()
        })

        return this
    }
} 