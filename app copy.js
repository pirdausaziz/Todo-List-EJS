const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash"); //customize letters

//const date = require(__dirname + "/date.js");
// mongoose.set('useFindAndModify', false);

const app = express();

//let items = [];
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

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your Todolist"
});

const item2 = new Item({
    name: "Hit + button to add a new item"
});

const item3 = new Item({
    name: "<----Hit this Button to delete new item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {

    Item.find({}, (err, foundItems) => {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success data is saved in DB");
                }
            });
            res.redirect("/");
        } else {
            res.render("template", {
                listTitle: "Today",
                newListsItems: foundItems
            });
        }
    })

})

app.get("/:customListName", (req, res) => {
    console.log(req.params.customListName);
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({
        name: customListName
    }, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                console.log("Doesnt exist");
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                console.log("Exist");
                res.render("template", {
                    listTitle: foundList.name,
                    newListsItems: foundList.items
                })
            }
        }
    })

});

app.post("/", (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName)
        })
    }

});

app.post("/delete", (req, res) => {
    //console.log(req.body.checkbox);
    const checkedItemId = req.body.kotak;
    const listName = req.body.senaraiNama;

    if(listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, (err) => {
            if (err) {
                console.log(err);
                res.redirect("/");
            } else {
                console.log("removal success");
                res.redirect("/");
            }
        })
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
            if(!err) {
                res.redirect("/" + listName);
            }
        })
    }

});

app.listen(3000, () => console.log('Server is listening on port 3000!'));