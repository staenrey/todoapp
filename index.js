const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const db = require("./database")
const app = express()

app.set('view engine', 'ejs')

app.use("/static", express.static(path.join(__dirname, "public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/todos", async (req, res) => {
    let results = await db.any("SELECT * FROM todos;")
    res.json(results)
})

// to add todo items

app.post("/todos", async (req, res) => {
    const newTodoItem = await db.one("INSERT INTO todos (task, completed) VALUES ($1, $2) returning *;",
        [req.body.task, false]
    )
    res.json(newTodoItem)
})

// to mark as completed

app.post("/todos/:taskId/completed", async (req, res) => {
    const updatedTodoItem = await db.one("UPDATE todos SET completed = $1 WHERE id = $2 returning *;",
        [req.body.completed, req.params.taskId]
    )
    res.json(updatedTodoItem)
})

PORT = 3000
app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}`)
})