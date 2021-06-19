const routes = process.env.ROUTESPATH || "../routes"
const reports = process.env.REPORTSPATH || "../reports"
const maxBlocks = process.env.MAXBLOCKS || 10
const maxDelivers = process.env.MAXDELIVERS || 3
const qDrones = 20

const fs = require("fs")
const path = require("path")

const Vector = require("./Vector.js")

const routespath = path.join(__dirname, routes)
const reportspath = path.join(__dirname, reports)

const readRoute = async () => {
    const regexpFiles = /^in(?!00)[\d]{2}.txt$/
    const droneRoutes = []

    const files = await fs.promises.readdir(routespath)

    let countDrones = 0

    files.forEach((file, ind) => {
        if(parseInt(file.substr(2 ,2)) <= qDrones || countDrones < qDrones) {
            regexpFiles.test(file) && droneRoutes.push(file)
            countDrones++
        }
    })

    droneRoutes.forEach((droneRoute) =>{
        const vDrone = new Vector(maxBlocks)

        fs.readFile(path.join(routespath, droneRoute), "utf8", async (err, data) => {
            const outFilename = droneRoute.replace("in", "out")
            const fh = await fs.promises.open(path.join(reportspath, outFilename), "w")

            if(err) {
                console.error(err.message)
                // IMPRIMIR ARCHIVO CON ERROR
            } else {
                
                const rutas = data.split("\r\n")

                rutas.forEach(async (ruta, ind, obj) => {
                    if(ind < maxDelivers) {
                        vDrone.processSequence(ruta)
    
                        await fh.writeFile(`${vDrone.getReport}${ind < obj.length - 1? "\n" : ""}`, "utf8")
                    } else 
                    {
                        await fh.writeFile(`El máximo de entregas es ${maxDelivers}${ind < obj.length - 1? "\n" : ""}`, "utf8")
                    }
                    
                })

                fh.close()
            }
        })
    })
}

readRoute()