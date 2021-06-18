const routes = process.env.ROUTESPATH || "../routes"
const reports = process.env.REPORTSPATH || "../reports"

const fs = require("fs")
const path = require("path")

const Vector = require("./Vector.js")

const routespath = path.join(__dirname, routes)
const reportspath = path.join(__dirname, reports)

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