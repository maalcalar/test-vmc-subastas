const routes = process.env.ROUTESPATH || "../routes"
const reports = process.env.REPORTSPATH || "../reports"

const fs = require("fs")
const path = require("path")

const routespath = path.join(__dirname, routes)
const reportspath = path.join(__dirname, reports)

const readRoute = async () => {
    const text = fs.readFile(path.join(routespath, "in01.txt"), "utf8", (err, data) => {
        if(err) {
            console.error("Error:", err.message)
        } else {
            console.log("Text is: \n")
            console.log(data)
        }
        return
    })
}

readRoute()