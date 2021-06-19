const fs = require("fs")
const path = require("path")

const Vector = require("./Vector.js")

const execute = async (routespath, reportspath, maxBlocks, maxDelivers, qDrones) => {
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

            await fh.writeFile("== Reporte de entregas ==\n", "utf8")

            if(err) {
                await fh.writeFile(err.message, "utf8")
            } else {
                
                const rutas = data.split("\r\n")

                rutas.forEach(async (ruta, ind, obj) => {
                    if(ind < maxDelivers) {
                        vDrone.processSequence(ruta)

                        const report = vDrone.getReport
                        const direction = report.substr(-2, 1)
                        const directionWord = direction == "N" ? "Norte" : direction == "S" ? "Sur" : direction == "O" ? "Oeste" : "Este"
                        const salida = `${report.substr(0, report.length - 4)}) dirección ${directionWord}`
    
                        await fh.writeFile(`${salida}${ind < obj.length - 1? "\n" : ""}`, "utf8")
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

module.exports = {
    execute
}