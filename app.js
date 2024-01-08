const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const date = require(__dirname + "/date.js");
const app = express();

var ListItem = [];

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {

    console.log(ListItem);

    res.render("template", {
        listTitle: "Today",
        newListsItems: ListItem,
    });

})

app.post("/", (req, res) => {

    let item = req.body.newItem;

    console.log(item);

    ListItem.push(item)

    res.redirect('/')

});

app.post("/delete", (req, res) => {
    console.log(req.body.checkbox);

    let item = req.body.senaraiNama;
    console.log("Debug: ", item);

    item = req.body.kotak
    console.log("Debug: ", item);

});

app.listen(3000, () => console.log('Server is listening on port 3000!'));