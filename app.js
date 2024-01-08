const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const _ = require("lodash"); //customize letters

const date = require(__dirname + "/date.js");

const app = express();

var ListItem = [];
//let work_items = [];

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const itemsSchema = {
//     name: String
// };

//const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({
//     name: "Welcome to your Todolist"
// });

// const item2 = new Item({
//     name: "Hit + button to add a new item"
// });

// const item3 = new Item({
//     name: "<----Hit this Button to delete new item"
// });

// const defaultItems = [item1, item2, item3];

// const listSchema = {
//     name: String,
//     items: [itemsSchema]
// };

//const List = mongoose.model("List", listSchema);

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