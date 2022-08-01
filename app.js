const express = require('express');
const app = express();
var methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const { v4: uuid } = require('uuid');
//faking out comment array for now
let comments = [
    {
        'username': 'Sabyasachi Banerjee',
        'comment': 'What a lovely day',
        'id': uuid()
    },
    {
        'username': 'Sreya Banerjee',
        'comment': 'Got a go for the work',
        'id': uuid()
    },
    {
        'username': 'Arijit Thakur',
        'comment': 'Heck!!Where the Tea?',
        'id': uuid()
    },
    {
        'username': 'Arnab Karmakar',
        'comment': 'Missing the old times',
        'id': uuid()
    }
]
//Getting all comments
app.get("/comments", (req, res) => {
    res.render('show_all_comments', { comments });
})
//Form to create new comment
app.get("/comments/new", (req, res) => {
    res.render('new_com_form');
})
//show specific comment
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    res.render('spec_comment', { ...comments.find(c => c.id == id) })
})
//Post route to create comments
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect("/comments");
})
//Form to edit specific comment
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    res.render('edit_comment', { ...comments.find(c => c.id == id) });
})
//Updates specific commnet on server
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const { new_comm } = req.body;
    comments.find(c => c.id == id).comment = new_comm;
    res.redirect("/comments");
})
//Deleting comment
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id != id);
    res.redirect("/comments");
})
//Listening for connections
app.listen(443, () => {
    console.log("Listening on port 443...");
})