const routes = process.env.ROUTESPATH || "../routes"
const reports = process.env.REPORTSPATH || "../reports"

const fs = require("fs")
const path = require("path")

const routespath = path.join(__dirname, routes)
const reportspath = path.join(__dirname, reports)

class Vector {
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

const readRoute = async () => {
    const regexpFiles = /^in[0-9]{2}.txt$/
    const droneRoutes = []

    const files = await fs.promises.readdir(routespath)

    files.forEach((file) => {
        regexpFiles.test(file) && droneRoutes.push(file)
    })

    droneRoutes.forEach((droneRoute) =>{
        const vDrone = new Vector()

        fs.readFile(path.join(routespath, droneRoute), "utf8", async (err, data) => {
            const outFilename = droneRoute.replace("in", "out")
            const fh = await fs.promises.open(path.join(reportspath, outFilename), "w")

            if(err) {
                console.error(err.message)
                // IMPRIMIR ARCHIVO CON ERROR
            } else {
                
                const rutas = data.split("\r\n")

                rutas.forEach(async (ruta, ind, obj) => {
                    const pasos = ruta.split("")

                    pasos.forEach((paso) => {
                        if (paso == "A") vDrone.moveForward()
                        else if(paso == "D") vDrone.turnRight()
                        else if(paso == "I") vDrone.turnLeft()
                    })

                    await fh.writeFile(`(${vDrone.getState.X}, ${vDrone.getState.Y}, ${vDrone.getState.D})${ind < obj.length - 1? "\n" : ""}`, "utf8")
                })

                fh.close()
            }
        })
    })
}

readRoute()