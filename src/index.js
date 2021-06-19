const routes = process.env.ROUTESPATH || "../routes"
const reports = process.env.REPORTSPATH || "../reports"
const maxBlocks = process.env.MAXBLOCKS || 10
const maxDelivers = process.env.MAXDELIVERS || 3
const qDrones = 20

const path = require("path")

const Program = require("./Program.js")

const routespath = path.join(__dirname, routes)
const reportspath = path.join(__dirname, reports)

Program.execute(routespath, reportspath, maxBlocks, maxDelivers, qDrones)