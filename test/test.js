const assert = require("assert")
const Vector = require("./../src/Vector")

console.log("\r")
console.log("Inicio de pruebas unitarias")
console.log("\r")

console.warn("Test 1: El inicio debe de ser en (0, 0, N).")
const vector1 = new Vector()

const estado1 = vector1.getReport

try {
    assert.strictEqual(estado1, "(0, 0, N)", "No comienza en (0, 0, N)")
    console.log("Sí comienza en (0, 0, N)")
} catch(err) {
    console.error(err.message)
}
console.log("\n")



console.warn("Test 2: Debe avanzar un paso y quedar en (0, 1, N).")
const vector2 = new Vector()

vector2.moveForward()
const estado2 = vector2.getReport

try {
    assert.strictEqual(estado2, "(0, 1, N)", "No queda en (0, 1, N)")
    console.log("Sí queda en (0, 1, N)")
} catch(err) {
    console.error(err.message)
}
console.log("\n")



console.warn("Test 3: Debe girar a la izquierda y quedar en (0, 0, O).")
const vector3 = new Vector()

vector3.turnLeft()
const estado3 = vector3.getReport

try {
    assert.strictEqual(estado3, "(0, 0, O)", "No queda en (0, 0, O)")
    console.log("Sí queda en (0, 0, O)")
} catch(err) {
    console.error(err.message)
}
console.log("\n")



console.warn("Test 4: Debe girar a la derecha y quedar en (0, 0, E).")
const vector4 = new Vector()

vector4.turnRight()
const estado4 = vector4.getReport

try {
    assert.strictEqual(estado4, "(0, 0, E)", "No queda en (0, 0, E)")
    console.log("Sí queda en (0, 0, E)")
} catch(err) {
    console.error(err.message)
}
console.log("\n")



console.warn("Test 5: Debe girar a la izquierda, avanzar, girar a la derecha y quedar en (-1, 0, N).")
const vector5 = new Vector()

vector5.turnLeft()
    .moveForward()
    .turnRight()
const estado5 = vector5.getReport

try {
    assert.strictEqual(estado5, "(-1, 0, N)", "No queda en (-1, 0, N)")
    console.log("Sí queda en (-1, 0, N)")
} catch(err) {
    console.error(err.message)
}
console.log("\n")



console.warn("Test 6: Debe procesar la secuencia AAAAIAA y quedar en (-2, 4, O).")
const vector6 = new Vector()

vector6.processSequence("AAAAIAA")
const estado6 = vector6.getReport

try {
    assert.strictEqual(estado6, "(-2, 4, O)", "No queda en (-2, 4, O)")
    console.log("Sí queda en (-2, 4, O)")
} catch(err) {
    console.error(err.message)
}
console.log("\n")



console.warn("Test 7: Debe procesar la secuencia AAAAIAA dar error por no quedar en (-2, 4, N).")
const vector7 = new Vector()

vector7.processSequence("AAAAIAA")
const estado7 = vector7.getReport

try {
    assert.strictEqual(estado7, "(-2, 4, N)", "No queda en (-2, 4, N)")
    console.log("Sí queda en (-2, 4, N)")
} catch(err) {
    console.error(err.message)
}


console.log("\r")
console.log("Fin de pruebas unitarias")
console.log("\r")