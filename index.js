const path = require("path");
const express = require("express")
const bodyParser = require("body-parser");

const app = express()

app.set('view engine', 'ejs');

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("home")
})

PORT = 3000
app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}`);
  });